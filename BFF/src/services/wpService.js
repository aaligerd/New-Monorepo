const wpClient = require('../utils/wpClient');
const wpService = {
    getLatestPosts: async (count = 5) => {
        const query = `
            query GetLatest($count: Int) {
                posts(first: $count) {
                    nodes {
                        title
                        slug
                        date
                        categories {
                            nodes {
                                id
                                slug
                                name
                                ancestors {
                                    nodes {
                                        id
                                        slug
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;
        const data = await wpClient(query, { count });
        return data.posts.nodes;
    },

    getHomepageData: async () => {
    // ── STEP 1: INITIAL GRAPHQL CALL (LATEST POSTS + THE CONTROL MAP) ──
    const initialQuery = `
        query GetBFFHomeBaselines {
            latestPosts: posts(first: 15, where: { orderby: { field: DATE, order: DESC } }) {
                nodes {
                    title
                    slug
                    excerpt
                    date
                  	author{
                      node{
                        firstName
                        lastName
                      }
                    }
                    featuredImage {
                        node {
                            sourceUrl
                        }
                    }
                    categories {
                        nodes {
                            id
                            slug
                            name
                            ancestors {
                                nodes {
                                    id
                                    slug
                                    name
                                }
                            }
                        }
                    }
                }
            }
            page(id: "homepage-settings", idType: URI) {
                homepageLayoutConfig {
                    homepageSections {
                        nodes {
                            id
                            name
                            slug
                        }
                    }
                }
            }
        }
    `;

    const initialData = await wpClient(initialQuery);

    const latestPosts = initialData?.latestPosts?.nodes || [];
    const layoutConfig = initialData?.page?.homepageLayoutConfig?.homepageSections?.nodes || [];

    // If no dynamic categories are selected, return early with just the latest posts
    if (!layoutConfig.length) {
        return { latestPosts, dynamicSections: [] };
    }

    // ── STEP 2: FIXED REUSABLE ROOT POSTS QUERY USING CATEGORYNAME ──
    const categoryQuery = `
        query GetBFFCategoryPosts($categoryName: String!) {
            posts(first: 10, where: { categoryName: $categoryName, orderby: { field: DATE, order: DESC } }) {
                nodes {
                    title
                    slug
                    date
                    author{
                      node{
                        firstName
                        lastName
                      }
                    }
                    featuredImage {
                        node {
                            sourceUrl
                        }
                    }
                    categories {
                        nodes {
                            id
                            slug
                            name
                            ancestors {
                                nodes {
                                    id
                                    slug
                                    name
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    // ── STEP 3: EXECUTE PARALLEL CONCURRENT CALLS VIA PROMISE.ALL ──
    const dynamicSections = await Promise.all(
        layoutConfig.map(async (category) => {
            try {
                // Query using categoryName instead of the slug identifier
                const categoryData = await wpClient(categoryQuery, { categoryName: category.name });
                const posts = categoryData?.posts?.nodes || [];

                return {
                    id: category.id,
                    name: category.name,
                    slug: category.slug,
                    posts: posts
                };
            } catch (error) {
                console.error(`Failed loading section data for block: ${category.name}`, error);
                return {
                    id: category.id,
                    name: category.name,
                    slug: category.slug,
                    posts: []
                };
            }
        })
    );

    // ── STEP 4: RETURN THE INTEGRATED PAYLOAD PACKAGE ──
    return {
        latestPosts,
        dynamicSections
    };
},

    getPostBySlug: async (slug) => {
        const query = `
            query GetPost($id: ID!) {
                post(id: $id, idType: SLUG) {
                    title
                    content
                    date
                    excerpt
                    featuredImage {
                        node { sourceUrl altText }
                    }
                    author {
                        node { name avatar { url } }
                    }
                    categories {
                    nodes {
                        id
                        slug
                        name
                        ancestors {
                        nodes {
                            id
                            slug
                            name
                        }
                        }
                    }
                    }
                    # This is your Rank Math SEO shield
                    seo {
                        title
                        focusKeywords
                        description
                        fullHead
                    }
                }
            }
        `;
        const data = await wpClient(query, { id: slug });
        return data.post;
    },
    getAuthorBySlug: async (slug) => {
        const query = `
            query GetAuthor($id: ID!) {
                user(id: $id, idType: SLUG) {
                    name
                    description
                    avatar { url }
                    # Getting the posts written by this author
                    posts(first: 10) {
                        nodes {
                            title
                            slug
                            date
                            featuredImage { node { sourceUrl } }
                          categories{
                            nodes{
                              slug
                            }
                          }
                        }
                    }
                    # SEO for the author page (Rank Math)
                    seo {
                        title
                        description
                      	focusKeywords
                        fullHead
                    }
                }
            }
        `;
        const data = await wpClient(query, { id: slug });
        return data.user;
    },
    getTagBySlug: async (slug) => {
        const query = `
            query GetTag($id: ID!) {
                tag(id: $id, idType: SLUG) {
                    name
                    description
                    count
                    # Getting the latest posts for this topic
                    posts(first: 10) {
                        nodes {
                            title
                            slug
                            date
                            featuredImage { node { sourceUrl } }
                        }
                    }
                    # Rank Math SEO for the topic page
                    seo {
                        title
                        description
                        fullHead
                    }
                }
            }
        `;
        const data = await wpClient(query, { id: slug });
        return data.tag;
    },
    getCategoryDetail: async (slug) => {
        const metaQuery = `
            query GetCategoryMetaOnly($slug: ID!) {
              category(id: $slug, idType: SLUG) {
                name
                description
                count
                slug
                seo {
                  title
                  description
                  fullHead
                }
              }
            }
        `;

        const postsQuery = `
            query GetPostsByResolvedName($categoryName: String!) {
              posts(first: 20, where: { categoryName: $categoryName, orderby: { field: DATE, order: DESC } }) {
                nodes {
                  title
                  slug
                  date
                  featuredImage {
                    node {
                      sourceUrl
                    }
                  }
                  categories {
                    nodes {
                      id
                      slug
                      name
                      ancestors {
                        nodes {
                          id
                          slug
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
        `;

        try {
            // 1. Fetch metadata
            const metaData = await wpClient(metaQuery, { slug });
            const category = metaData?.category;

            if (!category) return null;

            // 2. Fetch posts by resolved category name
            try {
                const postsData = await wpClient(postsQuery, { categoryName: category.name });
                category.posts = postsData?.posts || { nodes: [] };
            } catch (postError) {
                console.error(`Failed to fetch posts for resolved category name: ${category.name}`, postError);
                category.posts = { nodes: [] };
            }

            return category;
        } catch (error) {
            console.error(`Failed to fetch category details for slug: ${slug}`, error);
            return null;
        }
    },
    getTopMenu: async () => {
        const query = `
            query GetMenus {
                topMenu: menuItems(first: 100, where: {location: TOP_NAV}) {
                    nodes {
                    key: id
                    label
                    parentId
                    path
                    childItems{
                        nodes{
                        label
                        path
                        }
                    }
                    }
                }
            }
        `;
        const data = await wpClient(query);
        return data?.topMenu || null;
    },
};

module.exports = wpService;
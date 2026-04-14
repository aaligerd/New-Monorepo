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
                    }
                }
            }
        `;
        const data = await wpClient(query, { count });
        return data.posts.nodes;
    },
    getHomepageData: async () => {
        const query = `
            query GetHomepage {
                # Hero Section
                heroPosts: posts(first: 4) {
                    nodes {
                        title
                        slug
                        excerpt
                        categories {
                        edges {
                          node {
                            slug
                          }
                        }
                      }
                        featuredImage { node { sourceUrl } }
                    }
                }
                # Category Sections
                west_bengal_elections_2026: posts(first: 4, where: { categoryName: "West Bengal Elections 2026" }) {
                    nodes { title slug featuredImage { node { sourceUrl } } }
                }
                sports: posts(first: 4, where: { categoryName: "sports" }) {
                    nodes { title slug featuredImage { node { sourceUrl } } }
                }
                entertainment: posts(first: 4, where: { categoryName: "Entertainment" }) {
                    nodes { title slug featuredImage { node { sourceUrl } } }
                }
            }
        `;
        const data = await wpClient(query);
        return data;
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
                        nodes { name slug }
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
        const query = `
    query GetCategoryBySlug($slug: ID!) {
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
        posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
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
                slug
              }
            }
          }
        }
      }
    }
  `;

        // Fix 1: Pass 'slug' as the variable name to match the GraphQL definition
        const data = await wpClient(query, { slug: slug });

        // Fix 2: Return 'category' instead of 'tag' to match the query field
        return data?.category || null;
    }
};

module.exports = wpService;
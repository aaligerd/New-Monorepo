/**
 * Processes WPGraphQL category nodes with ancestors to return [L1, L2]
 */
export const getHierarchicalCategories = (categoryNodes) => {
  if (!categoryNodes || categoryNodes.length === 0) return { l1: null, l2: null };
  // Find the category that is furthest down the tree (the one with ancestors)
  const subCategory = categoryNodes.find(node => node.ancestors?.nodes?.length > 0);
  if (subCategory) {
    const l1 = subCategory.ancestors.nodes[0];
    const l2 = subCategory;
    return { l1, l2 };
  }
  return { l1: categoryNodes[0], l2: null };
};

/**
 * Generates the full SEO-friendly URL: /l1/l2/slug or /l1/slug
 */
export const getPostUrl = (post, fallbackCategorySlug) => {
  const nodes = post.categories?.nodes || [];
  const { l1, l2 } = getHierarchicalCategories(nodes);
  if (!l1) {
    if (fallbackCategorySlug) {
      return `/${fallbackCategorySlug}/${post.slug}`;
    }
    return `/news/${post.slug}`;
  }
  
  const segments = l2 ? [l1.slug, l2.slug] : [l1.slug];
  return "/" + [...segments, post.slug].join("/");
};

export const stripHtml = (html = "") => {
  return html.replace(/<[^>]*>/g, "").trim();
};

export const formatSectionTitle = (key) => {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

export const getAuthorName = (authorNode) => {
  if (!authorNode) return "Staff Writer";
  if (authorNode.firstName || authorNode.lastName) {
    return `${authorNode.firstName || ""} ${authorNode.lastName || ""}`.trim();
  }
  return authorNode.name || "Staff Writer";
};

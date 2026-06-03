// src/lib/fetchers/fetchTopMenu.js

function cleanPath(wpPath = "") {
  return wpPath.replace(/^\/category/, "").replace(/\/$/, "") || "/";
}

export async function fetchTopPrimaryMenu() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/topmenu/primary`,
      {
        next: { revalidate: 3600 }, // cache menu for 1 hour
      }
    );

    if (!res.ok) return [];

    const json = await res.json();
    const nodes = json?.data?.nodes ?? [];
    // Only keep top-level items (parentId === null)
    const topLevel = nodes.filter((n) => n.parentId === null);
    // Map to clean shape
    return topLevel.map((item) => ({
      key: item.key,
      label: item.label,
      path: cleanPath(item.path),
      children: (item.childItems?.nodes ?? []).map((child) => ({
        label: child.label,
        path: cleanPath(child.path),
      })),
    }));
  } catch (err) {
    console.error("[fetchTopMenu] failed:", err);
    return [];
  }
}

export async function fetchTopSecondaryMenu() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/topmenu/secondary`,
      {
        next: { revalidate: 3600 }, // cache menu for 1 hour
      }
    );

    if (!res.ok) return [];

    const json = await res.json();
    const nodes = json?.data?.nodes ?? [];
    // Only keep top-level items (parentId === null)
    const topLevel = nodes.filter((n) => n.parentId === null);
    // Map to clean shape
    return topLevel.map((item) => ({
      key: item.key,
      label: item.label,
      path: cleanPath(item.path),
      children: (item.childItems?.nodes ?? []).map((child) => ({
        label: child.label,
        path: cleanPath(child.path),
      })),
    }));
  } catch (err) {
    console.error("[fetchTopMenu] failed:", err);
    return [];
  }
}


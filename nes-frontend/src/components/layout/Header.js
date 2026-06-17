// src/components/layout/Header.js
import { fetchTopPrimaryMenu, fetchTopSecondaryMenu } from "../../lib/fetchers/fetchTopMenu";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const primaryMenuItems = await fetchTopPrimaryMenu();
  const secondaryMenuItems = await fetchTopSecondaryMenu();
  
  let latestPosts = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/home`,
      { next: { revalidate: 120 } }
    );
    if (res.ok) {
      const json = await res.json();
      latestPosts = json.data?.latestPosts || [];
    }
  } catch (err) {
    console.error("[Header] failed to fetch latest posts:", err);
  }

  return (
    <HeaderClient
      primaryMenuItems={primaryMenuItems}
      secondaryMenuItems={secondaryMenuItems}
      latestPosts={latestPosts}
    />
  );
}

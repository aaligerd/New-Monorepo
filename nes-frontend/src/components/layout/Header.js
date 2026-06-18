// src/components/layout/Header.js
import { fetchTopPrimaryMenu, fetchTopSecondaryMenu } from "../../lib/fetchers/fetchTopMenu";
import HeaderClient from "./HeaderClient";
import fs from "fs";
import path from "path";

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

  let newsTicker = "";
  try {
    const filePath = path.join(process.cwd(), "src", "data.txt");
    if (fs.existsSync(filePath)) {
      let fileContent = fs.readFileSync(filePath, "utf-8").trim();
      if (fileContent.startsWith("\uFEFF")) {
        fileContent = fileContent.slice(1);
      }
      if (fileContent.startsWith("{") && fileContent.endsWith("}")) {
        try {
          const jsonData = JSON.parse(fileContent);
          newsTicker = jsonData?.data?.newsTicker || "";
        } catch (parseErr) {
          console.warn("[Header] JSON parse error inside data.txt:", parseErr.message);
        }
      }
    }
  } catch (err) {
    console.warn("[Header] failed to read newsTicker from data.txt:", err.message);
  }

  return (
    <HeaderClient
      primaryMenuItems={primaryMenuItems}
      secondaryMenuItems={secondaryMenuItems}
      latestPosts={latestPosts}
      newsTicker={newsTicker}
    />
  );
}

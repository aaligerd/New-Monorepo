// src/components/layout/Header.js
import { fetchTopPrimaryMenu, fetchTopSecondaryMenu } from "../../lib/fetchers/fetchTopMenu";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const primaryMenuItems = await fetchTopPrimaryMenu();
  const secondaryMenuItems = await fetchTopSecondaryMenu();
  return (
    <HeaderClient
      primaryMenuItems={primaryMenuItems}
      secondaryMenuItems={secondaryMenuItems}
    />
  );
}

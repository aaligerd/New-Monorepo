// src/components/layout/Header.js
import { fetchTopMenu } from "../../lib/fetchers/fetchTopMenu";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const menuItems = await fetchTopMenu();
  return <HeaderClient menuItems={menuItems} />;
}

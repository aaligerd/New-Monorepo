// src/components/layout/Header.js
// Server component — fetches menu data, passes to client children

import { fetchTopMenu } from "../../lib/fetchers/fetchTopMenu";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const menuItems = await fetchTopMenu();
  return <HeaderClient menuItems={menuItems} />;
}
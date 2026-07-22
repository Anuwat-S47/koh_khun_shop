import { Home, Package, Settings, Settings2, ShoppingBag, SlidersHorizontal } from "lucide-react";

export const sidebarMenu = [
  {
    title: "Dashboard",
    to: "/",
    icon: Home,
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      {
        title: "Shop Setting",
        to: "/settings/shop",
        icon: ShoppingBag,
      },
      {
        title: "Other Settings",
        to: "/settings/other",
        icon: SlidersHorizontal,
      },
    ],
  },
];

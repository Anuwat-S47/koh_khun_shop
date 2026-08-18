import { SidebarMenu } from "@/types/menu-types";
import {
  Home,
  Settings,
  ShoppingBag,
  SlidersHorizontal,
} from "lucide-react";

export const sidebarMenu: SidebarMenu[] = [
  {
    title: "dashboard",
    to: "/",
    icon: Home,
  },

  {
    title: "settings",
    icon: Settings,
    children: [
      {
        title: "shopSetting",
        to: "/settings/shop-manage",
        icon: ShoppingBag,
      },

      {
        title: "otherSettings",
        to: "/settings/other",
        icon: SlidersHorizontal,
      },
    ],
  },
];

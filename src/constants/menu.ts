import { SidebarMenu } from "@/types/menu-types";
import {
  Home,
  icons,
  Receipt,
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
    title: "bill",
    to: "/bill",
    icon: Receipt,
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

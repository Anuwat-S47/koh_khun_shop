import { th } from "@/features/translations/languages/th";
import { LucideIcon } from "lucide-react";

type SidebarTranslationKey = keyof typeof th.sidebar;

type SidebarMenuItem = {
  title: Exclude<SidebarTranslationKey, "menu">;
  to: string;
  icon?: LucideIcon;
};

type SidebarMenuGroup = {
  title: Exclude<SidebarTranslationKey, "menu">;
  icon?: LucideIcon;
  children: SidebarMenuItem[];
};

export type SidebarMenu = SidebarMenuItem | SidebarMenuGroup;
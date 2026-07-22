import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { sidebarMenu } from "@/constants/menu";


const CustomSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenuItems />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
export default CustomSidebar;

function SidebarMenuItems() {
  return (
    <SidebarMenu>
      {sidebarMenu.map((item) => {
        if (item.children) {
          return (
            <Collapsible
              key={item.title}
              defaultOpen
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger
                  render={
                    <SidebarMenuButton>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>

                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  }
                />

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.children.map((child) => (
                      <SidebarMenuSubItem key={child.to}>
                        <SidebarMenuSubButton
                          render={
                            <Link to={child.to}>
                              {child.icon && <child.icon />}
                              <span>{child.title}</span>
                            </Link>
                          }
                        />
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        }
        return (
          <SidebarMenuItem key={item.to}>
            <SidebarMenuButton
              render={
                <Link to={item.to}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              }
            />
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
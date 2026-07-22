import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { useLogOut, useMe } from "@/hooks/userUser";
import { Skeleton } from "./ui/skeleton";
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import Swal from "sweetalert2";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";

function CustomNavbar() {
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useLogOut();
  const handlogout = async () => {
    const res = await Swal.fire({
      title: "ออกจากระบบ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    });

    if (!res.isConfirmed) return;

    await logout();
    navigate({
      to: "/login",
    });
  };
  const { data: user, isLoading } = useMe();

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />

        <Separator orientation="vertical" className="h-4" />

        <span className="font-semibold">Koh Khun Shop</span>
      </div>

      <div className="flex items-center gap-4">
        {isLoading ? (
          <Skeleton className="h-8 w-24" />
        ) : user ? (
          <div>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>{user.email}</MenubarTrigger>
                <MenubarContent>
                  <MenubarGroup>
                    <MenubarItem disabled={isPending} onClick={handlogout}>
                      {!isPending ? "LogOut" : "Loding..."}
                    </MenubarItem>
                  </MenubarGroup>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default CustomNavbar;

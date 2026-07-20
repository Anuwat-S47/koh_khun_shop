import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { useLogOut, useMe } from "@/features/auth/hooks/userUser";
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
    <div>
      <header className="flex justify-between mx-10 my-5">
        <div>
          <Link to="/">Logo</Link>
        </div>
        {isLoading ? (
          <Skeleton className="h-8 w-24" />
        ) : user ? (
          <>
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
          </>
        ) : (
          <div>
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}

export default CustomNavbar;

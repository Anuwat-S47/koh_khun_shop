import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { useLogOut, useMe } from "@/features/auth/hooks/userUser";
import { Skeleton } from "./ui/skeleton";
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./ui/menubar";
import Swal from "sweetalert2";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { useLanguageStore } from "@/features/translations/stores/language-store";
import { useTranslation } from "@/features/translations/hooks/useTranSlation";

function CustomNavbar() {
  const navigate = useNavigate();

  const { mutateAsync: logout, isPending } = useLogOut();
  const { data: user, isLoading } = useMe();

  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  const { t } = useTranslation();

  const handleLogout = async () => {
    const res = await Swal.fire({
      title: t.auth.logoutConfirm,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t.auth.logout,
      cancelButtonText: t.common.cancel,
    });

    if (!res.isConfirmed) return;

    await logout();

    navigate({
      to: "/login",
    });
  };

  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />

        <Separator orientation="vertical" className="h-4" />

        <span className="font-semibold">
          Koh Khun Shop
        </span>
      </div>

      <div className="flex items-center gap-4">
        {isLoading ? (
          <Skeleton className="h-8 w-24" />
        ) : user ? (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                {user.email}
              </MenubarTrigger>

              <MenubarContent align="end">
                <MenubarGroup>
                  {/* Language */}
                  <MenubarSub>
                    <MenubarSubTrigger>
                      {t.language.title}
                    </MenubarSubTrigger>

                    <MenubarSubContent>
                      <MenubarRadioGroup
                        value={language}
                        onValueChange={(value) =>
                          setLanguage(value as "th" | "lo")
                        }
                      >
                        <MenubarRadioItem value="th">
                          🇹🇭 ไทย
                        </MenubarRadioItem>

                        <MenubarRadioItem value="lo">
                          🇱🇦 ລາວ
                        </MenubarRadioItem>
                      </MenubarRadioGroup>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarSeparator />

                  {/* Logout */}
                  <MenubarItem
                    disabled={isPending}
                    onClick={handleLogout}
                  >
                    {isPending
                      ? t.common.loading
                      : t.auth.logout}
                  </MenubarItem>
                </MenubarGroup>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ) : (
          <Link to="/login">
            <Button variant="ghost">
              {t.auth.login}
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default CustomNavbar;

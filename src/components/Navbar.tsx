import { Outlet } from "@tanstack/react-router";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <div>
      <header>Navbar</header>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;

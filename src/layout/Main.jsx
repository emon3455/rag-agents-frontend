import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/NavBar";

const Main = () => {
  const excludedPaths = ["/login", "/register"]; // Paths where Navbar should be hidden
  const location = useLocation();
  const { pathname } = location;

  // Check if the current path should hide the Navbar
  const hideNavbar =
    excludedPaths.includes(pathname) ||
    pathname.startsWith("/conversation") ||
    pathname.startsWith("/agent-widget");

  return (
    <main className="bg-white text-black relative">
      {!hideNavbar && <Navbar />}
      <div className={`${hideNavbar ? "mt-0" : "mt-16"}`}>
        <Outlet />
      </div>
    </main>
  );
};

export default Main;

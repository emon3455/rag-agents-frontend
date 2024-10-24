import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/NavBar";

const Main = () => {
  const arr = ["/login", "/register"];
  const location = useLocation();
  const { pathname } = location;

  return (
    <main className="bg-white text-black relative">
      {arr.includes(pathname) ? null : <Navbar />}
      <div className="mt-16">
        <Outlet />
      </div>
    </main>
  );
};

export default Main;

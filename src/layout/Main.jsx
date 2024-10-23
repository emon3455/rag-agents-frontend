import { Outlet, useLocation} from "react-router-dom";
import Navbar from "../shared/NavBar";

const Main = () => {

    const arr = [
        "/login",
        "/register",
    ];
    const location = useLocation();
    const { pathname } = location;

    return (
        <main className="bg-white text-black relative">
            {arr.includes(pathname) ? null : <Navbar />}
            <Outlet />
        </main>
    );
};

export default Main;
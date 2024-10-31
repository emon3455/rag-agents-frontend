import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/features/auth/authSlice";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FaCircleChevronDown } from "react-icons/fa6";

const ConversationSidebar = ({ widgetId }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSelector((state) => state.userSlice.user);
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
    localStorage.removeItem("ODL-LLM-USER");
    navigate("/login");
  };

  return (
    <div>
      {/* Toggle button for mobile view */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-30 "
      >
        {!isSidebarOpen && (
          <AiOutlineMenuUnfold
            className="bg-black text-white rounded p-1"
            size={22}
          />
        )}
      </button>

      {/* Sidebar overlay */}
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar content */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-black text-white flex flex-col z-30 transform transition-transform duration-300 md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="text-white text-2xl font-bold px-6 py-5">
          <span className="text-orange-500">ODL</span>-AI
        </h1>
        <nav className="flex flex-col justify-between h-full">
          <div className="flex flex-col mt-8 space-y-4 px-6">
            <Link
              to="/"
              className="text-white px-3 py-2 rounded-md text-lg font-medium hover:bg-orange-500 transition-all duration-400"
              onClick={() => setIsSidebarOpen(false)}
            >
              Home
            </Link>
            {user?._id && (
              <Link
                to="/agent"
                className="text-white px-3 py-2 rounded-md text-lg font-medium hover:bg-orange-500 transition-all duration-400"
                onClick={() => setIsSidebarOpen(false)}
              >
                Agent
              </Link>
            )}
            {user?._id && (
              <ul className="relative">
                <li
                  className="flex items-center   gap-2 text-white px-3 py-2 rounded-md text-lg font-medium hover:bg-orange-500 transition-all duration-400"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  Share
                  <FaCircleChevronDown
                    className={`w-5 transition  ${
                      showDropdown ? "-rotate-180" : "rotate-0"
                    }`}
                  />
                </li>

                <ul
                  className={`overflow-hidden transition-all duration-300 ${
                    showDropdown ? "max-h-40" : "max-h-0"
                  } pl-6 leading-10 font-medium`}
                >
                  <li>
                    <Link to={`/agent-widget/${widgetId}`}>Widget</Link>
                  </li>
                  <li>API</li>
                  <li>Agent Page</li>
                </ul>
              </ul>
            )}
          </div>
          <div className="p-6 py-5">
            {user?._id ? (
              <button
                onClick={() => {
                  logoutHandler();
                  setIsSidebarOpen(false);
                }}
                className="w-full  text-center text-white px-6  py-2 rounded-md text-lg font-medium bg-orange-500 transition-all duration-400 "
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-white px-3 py-2 rounded-md text-lg font-medium hover:bg-orange-500 transition-all duration-400"
                onClick={() => setIsSidebarOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ConversationSidebar;

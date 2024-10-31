import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/features/auth/authSlice";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FaCircleChevronDown } from "react-icons/fa6";
import CModal from "../../utils/CModal/CModal";
import { FiCopy } from "react-icons/fi"; // Icon for the copy button, optional
import CButton from "../../utils/CButton/CButton";
import { successAlert } from "../../utils/allertFunction";

const ConversationSidebar = ({ widgetId }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSelector((state) => state.userSlice.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showWidgetModal, setShowWidgetModal] = useState(false);
  const [showAgentPageModal, setShowAgentPageModal] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);

  const scriptCode = `<script src="https://rag-agent-js.vercel.app/widget.js?agentId=${widgetId}"></script>`;
  const agentPageCode = `https://rag-agent-frontend.vercel.app/agent-widget/${widgetId}`;
  const reqBody = `{
  "agentId": "671790c727c737728ca31b78", // Replace with your Agent ID 
  "question": "Can you tell me about the ny estate law.ai" // Replace with your question
}
              `;

  const reqUrl = ` https://rag-agent-js.vercel.app/api/agents/ask-question`;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    successAlert({ title: "Script copied to clipboard!" });
  };

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
                  className="flex items-center justify-between  gap-2 text-white px-3 py-2 rounded-md text-lg font-medium hover:bg-orange-500 transition-all duration-400"
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
                  <li
                    className="hover:bg-orange-500 cursor-pointer px-2 rounded-md transition"
                    onClick={() => setShowWidgetModal(true)}
                  >
                    {/* <Link to={`/agent-widget/${widgetId}`}>Widget</Link> */}
                    Widget
                  </li>
                  <li
                    className="hover:bg-orange-500 cursor-pointer px-2 rounded-md transition"
                    onClick={() => setShowApiModal(true)}
                  >
                    API
                  </li>
                  <li
                    className="hover:bg-orange-500 cursor-pointer px-2 rounded-md transition"
                    onClick={() => setShowAgentPageModal(true)}
                  >
                    Agent Page
                  </li>
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
      <CModal
        open={showWidgetModal}
        height="h-10"
        title="Share Widget"
        onClose={() => setShowWidgetModal(false)}
      >
        <div className="h-60">
          <pre className="bg-gray-900 p-3 rounded-md my-4 text-wrap h-full flex items-center ">
            <code className="text-white">{scriptCode}</code>
          </pre>
          <CButton
            onClick={() => handleCopy(scriptCode)}
            variant="solid"
            className="ml-auto text-white"
          >
            <FiCopy size={20} /> Copy to Clipboard
          </CButton>
        </div>
      </CModal>
      <CModal
        open={showAgentPageModal}
        height="h-10"
        title="Share Agent Page"
        onClose={() => setShowAgentPageModal(false)}
      >
        <div className="h-60">
          <pre className="bg-gray-900 p-3 rounded-md my-4 text-wrap h-full flex items-center ">
            <code className="text-white">{agentPageCode}</code>
          </pre>
          <CButton
            onClick={() => handleCopy(agentPageCode)}
            variant="solid"
            className="ml-auto text-white"
          >
            <FiCopy size={20} /> Copy to Clipboard
          </CButton>
        </div>
      </CModal>
      <CModal
        open={showApiModal}
        height=""
        width="w-full md:w-2/3 lg:w-1/2"
        title="HOW TO USE OUR API"
        onClose={() => setShowApiModal(false)}
      >
        <div className="p-4 bg-white rounded-md">
          <p className="text-gray-800 mb-4">
            To retrieve information from the API, send a <strong>POST</strong>{" "}
            request to the following endpoint with the required parameters in
            the request body.
          </p>

          {/* API Endpoint Section */}
          <div className="flex gap-2 mb-4">
            <pre className="bg-gray-900 p-3 rounded-md flex items-center whitespace-nowrap">
              <code className="text-white">POST</code>
            </pre>
            <div className="bg-gray-900 p-3 rounded-md flex items-center overflow-hidden">
              <code className="text-white whitespace-normal">{reqUrl}</code>
            </div>
            <button
              onClick={() => handleCopy(reqUrl)}
              className="text-white bg-gray-900 rounded p-3"
            >
              <FiCopy size={20} />
            </button>
          </div>

          {/* Request Body Section */}
          <div className="flex gap-2 mb-4">
            <pre className="bg-gray-900 p-3 rounded-md flex items-center whitespace-nowrap">
              <code className="text-white">Body</code>
            </pre>
            <pre className="bg-gray-900 p-3 rounded-md flex items-center overflow-hidden overflow-x-auto">
              <code className="text-white ">{reqBody}</code>
            </pre>
            <button
              onClick={() => handleCopy(reqBody)}
              className="text-white bg-gray-900 rounded p-3 "
            >
              <FiCopy size={20} />
            </button>
          </div>
        </div>
      </CModal>
    </div>
  );
};

export default ConversationSidebar;

import { createBrowserRouter } from "react-router-dom";

import Main from "../layout/Main";
import Error from "../shared/Error";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import AgentPage from "../pages/agent/AgentPage";
import CreateAgentPage from "../pages/agent/CreateAgentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/agent",
        element: <AgentPage />,
      },
      {
        path: "/create-agent",
        element: <CreateAgentPage />,
      },
    ],
  },
]);

export default router;

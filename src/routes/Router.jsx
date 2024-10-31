import { createBrowserRouter } from "react-router-dom";

import Main from "../layout/Main";
import Error from "../shared/Error";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import AgentPage from "../pages/agent/AgentPage";
import ConversationPage from "../pages/conversation/ConversationPage";
import CreateAgentPage from "../pages/agent/CreateAgentPage";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";
import UpdateAgentPage from "../pages/agent/UpdateAgentPage";
import Widget from "../pages/conversation/Widget";
import ShareAgent from "../pages/conversation/ShareAgent";

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
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PrivateRoute>
            <Register />
          </PrivateRoute>
        ),
      },
      {
        path: "/agent",
        element: (
          <PrivateRoute>
            <AgentPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/create-agent",
        element: <CreateAgentPage />,
      },
      {
        path: "/update-agent/:id",
        element: <UpdateAgentPage />,
      },
      {
        path: "/agent-widget/:id",
        element: <Widget />,
      },
      {
        path: "/share-agent/:id",
        element: <ShareAgent />,
      },
      {
        path: `/conversation/:id`,
        element: (
          <PrivateRoute>
            <ConversationPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

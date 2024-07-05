import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Energy from "./pages/Energy";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Automation from "./pages/Automation";
import Building from "./pages/Building";
import History from "./pages/History";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/automation",
    element: <Automation />,
  },
  {
    path: "/building",
    element: <Building />,
  },
  {
    path: "/energy",
    element: <Energy />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./utils/error-page";
import Clients from "./Pages/Clients/Clients";
import Login from "./Pages/Login/Login";
import Jobs from "./Pages/Jobs/Jobs";
import Job from "./Pages/Jobs/Job";

import Home from "./Pages/Home/Home";
import Client from "./Pages/Clients/Client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "clients",
        element: <Clients />,
      },
      {
        path: "clients/:id/edit",
        element: <Client />,
      },
      {
        path: "clients/tasks",
        element: <Jobs />,
      },
      {
        path: "clients/tasks/:id/edit",
        element: <Job />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

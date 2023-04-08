import { createBrowserRouter } from "react-router-dom";
import AuthWrapper from "../utils/AuthWrapper";
import ErrorPage from "../Pages/Error/Error";
import Clients from "../Pages/Clients/Clients";
import Login from "../Pages/Log/Login";
import Jobs from "../Pages/Jobs/Jobs";
import Job from "../Pages/Jobs/Job";
import Home from "../Pages/Home/Home";
import Client from "../Pages/Clients/Client";
import NewClient from "../Pages/Clients/NewClient";
import NewJob from "../Pages/Jobs/NewJob";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthWrapper Component={Home} requiresAuth={true} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "clients",
        element: <AuthWrapper Component={Clients} requiresAuth={true} />,
      },
      {
        path: "clients/:id/edit",
        element: <AuthWrapper Component={Client} requiresAuth={true} />,
      },
      {
        path: "clients/tasks",
        element: <AuthWrapper Component={Jobs} requiresAuth={true} />,
      },
      {
        path: "clients/tasks/:id/edit",
        element: <AuthWrapper Component={Job} requiresAuth={true} />,
      },
      {
        path: "clients/create",
        element: <AuthWrapper Component={NewClient} requiresAuth={true} />,
      },
      {
        path: "clients/:id/newtasks",
        element: <AuthWrapper Component={NewJob} requiresAuth={true} />,
      },
    ],
  },
  {
    path: "login",
    element: <AuthWrapper Component={Login} requiresAuth={false} />,
  },
]);

export default router;

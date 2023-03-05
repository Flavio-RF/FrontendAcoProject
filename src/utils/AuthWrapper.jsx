import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./token";

export default function AuthWrapper({ Component, requiresAuth }) {
  return requiresAuth && !isLoggedIn() ? (
    <Navigate to={"/login"} />
  ) : !requiresAuth && isLoggedIn() ? (
    <Navigate to={"/"} />
  ) : (
    <Component />
  );
}

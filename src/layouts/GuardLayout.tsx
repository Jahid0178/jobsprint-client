import { Navigate, Outlet } from "react-router";

const GuardLayout = () => {
  const authToken = localStorage.getItem("jobsprint-auth-token");

  if (authToken) return <Navigate to="/" />;

  return <Outlet />;
};

export default GuardLayout;

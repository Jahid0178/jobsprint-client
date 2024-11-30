import { Navigate, Outlet } from "react-router";
import { jwtDecode } from "jwt-decode";
import { IJwtPayload } from "@/typescript/interface";

interface RoleLayoutProps {
  role: string;
}

const RoleLayout = ({ role }: RoleLayoutProps) => {
  const jobSprintToken = localStorage.getItem("jobsprint-auth-token");

  if (!jobSprintToken) {
    return <Navigate to="/login" />;
  }

  const decodedToken = jwtDecode<IJwtPayload>(jobSprintToken) as IJwtPayload;

  if (decodedToken?.role === role) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
};

export default RoleLayout;

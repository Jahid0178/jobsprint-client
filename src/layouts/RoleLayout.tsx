import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface RoleLayoutProps {
  role: string;
}

const RoleLayout = ({ role }: RoleLayoutProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const jobSprintToken = localStorage.getItem("jobsprint-auth-token");

  if (!jobSprintToken) {
    return <Navigate to="/auth/login" />;
  }

  if (user?.role === role) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
};

export default RoleLayout;

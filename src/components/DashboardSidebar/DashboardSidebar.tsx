import { Link, useNavigate } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { IJwtPayload } from "@/typescript/interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { logOut, resetState } from "@/features/auth/authSlice";
import toast from "react-hot-toast";

const DashboardSidebar = () => {
  const [role, setRole] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const jobSprintToken = localStorage.getItem("jobsprint-auth-token") ?? "";
  const decodedToken = jobSprintToken && jwtDecode<IJwtPayload>(jobSprintToken);

  const handleLogout = () => {
    localStorage.removeItem("jobsprint-auth-token");
    dispatch(logOut());
    dispatch(resetState());
    toast.success("Logout successful");
    navigation("/");
  };

  useEffect(() => {
    if (decodedToken) {
      setRole(decodedToken.role ?? "");
    }
  }, [decodedToken]);
  return (
    <Sidebar>
      <SidebarHeader className="border-b py-3.5">
        <Link to="/">
          <h2 className="text-xl font-semibold tracking-tight text-black">
            JobSprint
          </h2>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {role === "admin" ? (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard/job-listings">Job Listings</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard/job-listings/add">Add Job</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          ) : (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/">Jobs</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard/applied-jobs">Applied Jobs</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleLogout}>Log Out</Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;

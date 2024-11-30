import { Link } from "react-router";
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

const DashboardSidebar = () => {
  const [role, setRole] = useState("");
  const jobSprintToken = localStorage.getItem("jobsprint-auth-token") ?? "";
  const decodedToken = jobSprintToken && jwtDecode<IJwtPayload>(jobSprintToken);

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
        <Button>Log Out</Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;

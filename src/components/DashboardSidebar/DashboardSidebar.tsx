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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logOut, resetState } from "@/features/auth/authSlice";
import toast from "react-hot-toast";

const DashboardSidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jobsprint-auth-token");
    dispatch(logOut());
    dispatch(resetState());
    toast.success("Logout successful");
    navigation("/");
  };

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
          {user?.role === "admin" ? (
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

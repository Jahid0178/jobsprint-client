import DashboardSidebar from "@/components/DashboardSidebar/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <SidebarProvider>
        <DashboardSidebar />
        <div className="w-full">
          <SidebarTrigger className="md:hidden" />
          <Outlet />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;

import DashboardHeader from "@/components/DashboardHeader/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <SidebarProvider>
        <DashboardSidebar />
        <div className="w-full">
          <DashboardHeader />
          <SidebarTrigger className="md:hidden" />
          <Outlet />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;

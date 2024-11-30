import { useSelector } from "react-redux";
import DashboardHeaderActionButton from "./DashboardHeaderActionButton";
import { RootState } from "@/store/store";

const DashboardHeader = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <header className="p-2 border-b">
      <nav className="flex justify-between items-center gap-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <div className="flex items-center gap-4">
          <h4>Hello, {user?.fullName || "User"}</h4>
          {user && <DashboardHeaderActionButton user={user} />}
        </div>
      </nav>
    </header>
  );
};

export default DashboardHeader;

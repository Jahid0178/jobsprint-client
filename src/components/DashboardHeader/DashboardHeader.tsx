import DashboardHeaderActionButton from "./DashboardHeaderActionButton";

const DashboardHeader = () => {
  return (
    <header className="p-2 border-b">
      <nav className="flex justify-between items-center gap-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <DashboardHeaderActionButton />
      </nav>
    </header>
  );
};

export default DashboardHeader;

import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {

  return (
    <div className="flex bg-green-50 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-8">
        <Outlet />
      </div>

    </div>
  );
}

export default DashboardLayout;
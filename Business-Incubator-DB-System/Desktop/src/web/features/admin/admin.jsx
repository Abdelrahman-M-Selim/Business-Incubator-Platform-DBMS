import { useState } from "react";
import Dashboard from "./Dashboard/Dashboard";
import Sidebar from "./Sidebar";
import Workshops from "./Workshops/Workshops";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Workshops":
        return <Workshops />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderContent()}
      </div>
    </>
  );
};

export default Admin;
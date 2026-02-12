import React, { useState, useEffect } from "react";
import { Box, Plus, Layout, Monitor, Armchair } from "lucide-react";
import ResourceTable from "./ResourceTable";
import AddResourceForm from "./AddResourceForm";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const stats = {
    total: resources.length,
    workspaces: resources.filter((r) => r.type === "workspace").length,
    rooms: resources.filter((r) => r.type === "meeting_room").length,
    equipment: resources.filter((r) => r.type === "equipment").length,
  };

  const fetchResources = async () => {
    setLoading(true);
    try {
      const data = await window.electron.invoke("resources:get-all");
      setResources(data || []);
    } catch (error) {
      console.error("Failed to fetch resources:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white p-4 md:p-8 overflow-x-hidden">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-5xl font-black text-black mb-2 flex items-center gap-4">
            <div className="bg-[#FF6B6B] p-3 rounded-2xl border-4 border-black">
              <Box size={32} strokeWidth={3} className="text-white" />
            </div>
            Resources
          </h1>
          <p className="text-gray-700 font-bold text-lg">
            Manage office spaces, meeting rooms & equipment.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#FFDE59] text-black px-6 py-4
          border-4 border-black rounded-2xl font-black
          hover:shadow-lg hover:-translate-y-1 transition-all"
        >
          <Plus size={24} strokeWidth={3} />
          Add Resource
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Resources"
          value={stats.total}
          color="bg-[#89CFF0]"
          icon={<Box />}
        />
        <StatsCard
          title="Workspaces"
          value={stats.workspaces}
          color="bg-[#90EE90]"
          icon={<Layout />}
        />
        <StatsCard
          title="Meeting Rooms"
          value={stats.rooms}
          color="bg-[#FFB347]"
          icon={<Armchair />}
        />
        <StatsCard
          title="Equipment"
          value={stats.equipment}
          color="bg-[#D8BFD8]"
          icon={<Monitor />}
        />
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <ResourceTable
          resources={resources}
          loading={loading}
          onAddClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AddResourceForm
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchResources();
          }}
        />
      )}
    </div>
  );
};

const StatsCard = ({ title, value, color, icon }) => (
  <div
    className={`p-6 ${color} border-4 border-black rounded-2xl
    hover:shadow-lg hover:-translate-y-1 transition-all`}
  >
    <div className="flex items-center gap-2 mb-2 font-bold text-black">
      {icon}
      <h3>{title}</h3>
    </div>
    <p className="text-5xl font-black text-black">{value}</p>
  </div>
);

export default Resources;

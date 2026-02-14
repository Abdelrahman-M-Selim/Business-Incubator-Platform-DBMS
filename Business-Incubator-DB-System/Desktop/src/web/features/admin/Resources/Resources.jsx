import React, { useState, useEffect } from "react";
import {
  Box,
  Plus,
  Building,
  Laptop,
  Layers,
  Search,
  Loader2,
  Inbox,
  Pin,
  X,
} from "lucide-react";
import ResourceTable from "./ResourceTable";
import AddResourceForm from "./AddResourceForm";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const fetchResources = async () => {
    setLoading(true);
    try {
      const data = await window.electron.invoke("resources:get-all");
      setResources(data || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleAddResource = async () => {
    setShowAddForm(false);
    fetchResources();
  };

  const filteredResources = resources.filter(
    (r) =>
      (filterType === "all" || r.type === filterType) &&
      r.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 font-sans">
      <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 flex items-center gap-4">
              <div className="p-3 md:p-4 bg-orange-100 rounded-2xl text-orange-600 shadow-sm">
                <Box size={24} />
              </div>
              Resources
            </h1>
            <p className="text-lg md:text-xl text-gray-500 mt-2 ml-1 font-medium">
              Manage office spaces, meeting rooms & equipment.
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <Plus size={24} />
            Add Resource
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Resources"
            value={resources.length}
            icon={Layers}
            colorClass="bg-blue-50 text-blue-600"
          />
          <StatCard
            title="Workspaces"
            value={resources.filter((r) => r.type === "workspace").length}
            icon={Building}
            colorClass="bg-green-50 text-green-600"
          />
          <StatCard
            title="Meeting Rooms"
            value={resources.filter((r) => r.type === "meeting_room").length}
            icon={Laptop}
            colorClass="bg-orange-50 text-orange-600"
          />
          <StatCard
            title="Equipment"
            value={resources.filter((r) => r.type === "equipment").length}
            icon={Laptop}
            colorClass="bg-purple-50 text-purple-600"
          />
        </div>

        {/* Filters & Actions Bar */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-8 flex flex-col xl:flex-row gap-5 items-center justify-between">
          <div className="relative flex-1 w-full xl:w-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-lg font-medium transition-all"
            />
          </div>

          <div className="w-full xl:w-auto">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full xl:w-64 px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700 bg-white cursor-pointer text-lg font-medium"
            >
              <option value="all">All Types</option>
              <option value="workspace">Workspaces</option>
              <option value="meeting_room">Meeting Rooms</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>
        </div>

        {/* Table Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-200 border-dashed">
            <Loader2 className="text-4xl text-orange-600 animate-spin mb-4" />
            <p className="text-gray-500 text-xl font-medium">
              Loading resources...
            </p>
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <ResourceTable
              resources={filteredResources}
              loading={false}
              onAddClick={() => setShowAddForm(true)}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-200 border-dashed text-center">
            <div className="p-6 bg-gray-50 rounded-full mb-6">
              <Inbox className="text-5xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No resources found
            </h3>
            <p className="text-gray-500 text-lg max-w-md mt-1 mb-8">
              Start by adding rooms, desks, or equipment to manage your
              facility.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-md"
            >
              Add First Resource
            </button>
          </div>
        )}

        {/* Add Resource Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
              <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between bg-white">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                    <Pin size={16} />
                  </div>
                  Add New Resource
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 bg-gray-50/50">
                <AddResourceForm
                  onClose={() => setShowAddForm(false)}
                  onSuccess={handleAddResource}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-6">
      <div className={`p-4 rounded-xl ${colorClass}`}>
        <Icon size={24} />
      </div>
      <span className="text-sm md:text-base font-bold text-gray-400 uppercase tracking-wider">
        {title}
      </span>
    </div>
    <div className="text-4xl md:text-5xl font-black text-gray-900">{value}</div>
  </div>
);

export default Resources;

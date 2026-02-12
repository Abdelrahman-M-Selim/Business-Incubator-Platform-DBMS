import React, { useState } from "react";
import { X, Save, Box } from "lucide-react";

const AddResourceForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "workspace",
    capacity: 1,
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await window.electron.invoke("resources:add", formData);
      onSuccess();
    } catch (error) {
      console.error("Failed to add resource", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black w-full max-w-lg rounded-2xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b-4 border-black bg-orange-100 flex items-center justify-between">
          <h2 className="text-3xl font-black flex items-center gap-3">
            <span className="bg-orange-300 p-2 rounded-xl border-4 border-black">
              <Box size={24} />
            </span>
            Add Resource
          </h2>

          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center
            border-4 border-black rounded-full font-black text-2xl
            hover:bg-orange-200 transition-all"
          >
            <X />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-black text-sm mb-1">
              Resource Name
            </label>
            <input
              required
              className="w-full border-4 border-black p-3 rounded-2xl
              font-bold outline-none bg-white
              focus:ring-4 focus:ring-orange-300 transition-all"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Conference Room A"
            />
          </div>

          <div>
            <label className="block font-black text-sm mb-1">Type</label>
            <select
              className="w-full border-4 border-black p-3 rounded-2xl
              font-bold outline-none bg-white
              focus:ring-4 focus:ring-orange-300 transition-all"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="workspace">Workspace</option>
              <option value="meeting_room">Meeting Room</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-black text-sm mb-1">
                Capacity
              </label>
              <input
                type="number"
                min="1"
                className="w-full border-4 border-black p-3 rounded-2xl
                font-bold outline-none
                focus:ring-4 focus:ring-orange-300 transition-all"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
              />
            </div>

            <div className="flex-1">
              <label className="block font-black text-sm mb-1">
                Location
              </label>
              <input
                required
                className="w-full border-4 border-black p-3 rounded-2xl
                font-bold outline-none
                focus:ring-4 focus:ring-orange-300 transition-all"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="e.g. Floor 2"
              />
            </div>
          </div>

          <button
            className="w-full bg-orange-300 text-black font-black text-lg py-4
            mt-6 rounded-2xl border-4 border-black
            hover:bg-orange-400 hover:shadow-lg hover:-translate-y-1
            transition-all flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Save Resource
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddResourceForm;

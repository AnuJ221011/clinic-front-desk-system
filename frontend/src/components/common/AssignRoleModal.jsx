import React, { useEffect, useState } from "react";
import { authService } from "../../services/auth";
import { toast } from "react-toastify";

const AssignRoleModal = ({ onClose }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getUsers()
      .then(setUsers)
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  const handleAssign = async (id) => {
    try {
      await authService.assignRole(id, "front_desk");
      toast.success("Role updated successfully");
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, role: "front_desk" } : u
        )
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update role");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Assign Roles</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="space-y-3">
            {users.map((u) => (
              <div
                key={u.id}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-sm text-gray-500">
                    {u.username} – Role: {u.role}
                  </p>
                </div>
                {u.role !== "front_desk" && (
                  <button
                    onClick={() => handleAssign(u.id)}
                    className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Make Front Desk
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignRoleModal;

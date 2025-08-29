import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { queueService } from "../../services/queue";
import QueueList from "./QueueList";
import AddPatientModal from "./AddPatientModal";
import LoadingSpinner from "../common/LoadingSpinner";

const QueueManagement = () => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadQueue();
  }, []);

  const loadQueue = async () => {
    try {
      const data = await queueService.getAllQueue();
      setQueue(data);
    } catch (error) {
      console.error("Failed to load queue:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPatient = async (patientData) => {
    try {
      await queueService.addToQueue(patientData);
      toast.success("Patient added to queue successfully!");
      loadQueue();
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to add patient:", error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await queueService.updateQueueStatus(id, status);
      toast.success("Queue status updated!");
      loadQueue();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleRemovePatient = async (id) => {
    if (window.confirm("Are you sure you want to remove this patient from the queue?")) {
      try {
        await queueService.removeFromQueue(id);
        toast.success("Patient removed from queue!");
        loadQueue();
      } catch (error) {
        console.error("Failed to remove patient:", error);
      }
    }
  };

  const handleClearQueue = async () => {
    if (window.confirm("Are you sure you want to clear the entire queue?")) {
      try {
        await queueService.clearQueue();
        toast.success("Queue cleared successfully!");
        loadQueue();
      } catch (error) {
        console.error("Failed to clear queue:", error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <div className="bg-gray-900 shadow-lg rounded-xl p-6 border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-100">Queue Management</h2>
          <div className="flex gap-3">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => setShowAddModal(true)}
            >
              Add Patient
            </button>
            {queue.length > 0 && (
              <button
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
                onClick={handleClearQueue}
              >
                Clear Queue
              </button>
            )}
          </div>
        </div>

        {/* Queue List */}
        <QueueList
          queue={queue}
          onUpdateStatus={handleUpdateStatus}
          onRemovePatient={handleRemovePatient}
        />
      </div>

      {/* Modal */}
      <AddPatientModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddPatient}
      />
    </div>
  );
};

export default QueueManagement;

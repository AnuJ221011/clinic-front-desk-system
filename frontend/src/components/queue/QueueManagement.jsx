import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { queueService } from '../../services/queue';
import QueueList from './QueueList';
import AddPatientModal from './AddPatientModal';
import LoadingSpinner from '../common/LoadingSpinner';

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
      console.error('Failed to load queue:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPatient = async (patientData) => {
    try {
      await queueService.addToQueue(patientData);
      toast.success('Patient added to queue successfully!');
      loadQueue();
      setShowAddModal(false);
    } catch (error) {
      console.error('Failed to add patient:', error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await queueService.updateQueueStatus(id, status);
      toast.success('Queue status updated!');
      loadQueue();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleRemovePatient = async (id) => {
    if (window.confirm('Are you sure you want to remove this patient from the queue?')) {
      try {
        await queueService.removeFromQueue(id);
        toast.success('Patient removed from queue!');
        loadQueue();
      } catch (error) {
        console.error('Failed to remove patient:', error);
      }
    }
  };

  const handleClearQueue = async () => {
    if (window.confirm('Are you sure you want to clear the entire queue?')) {
      try {
        await queueService.clearQueue();
        toast.success('Queue cleared successfully!');
        loadQueue();
      } catch (error) {
        console.error('Failed to clear queue:', error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="card">
        <div className="flex flex-between flex-align-center mb-1">
          <h2>Queue Management</h2>
          <div className="flex gap-1">
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              Add Patient
            </button>
            {queue.length > 0 && (
              <button className="btn btn-warning" onClick={handleClearQueue}>
                Clear Queue
              </button>
            )}
          </div>
        </div>

        <QueueList
          queue={queue}
          onUpdateStatus={handleUpdateStatus}
          onRemovePatient={handleRemovePatient}
        />
      </div>

      <AddPatientModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddPatient}
      />
    </div>
  );
};

export default QueueManagement;
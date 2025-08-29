import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { appointmentService } from '../../services/appointments';
import { doctorService } from '../../services/doctors';
import AppointmentList from './AppointmentList';
import BookAppointmentModal from './BookAppointmentModal';
import LoadingSpinner from '../common/LoadingSpinner';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  const loadData = async () => {
    try {
      const [appointmentsData, doctorsData] = await Promise.all([
        appointmentService.getAllAppointments(selectedDate),
        doctorService.getAllDoctors()
      ]);
      setAppointments(appointmentsData);
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async (appointmentData) => {
    try {
      await appointmentService.createAppointment(appointmentData);
      toast.success('Appointment booked successfully!');
      loadData();
      setShowBookModal(false);
    } catch (error) {
      console.error('Failed to book appointment:', error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await appointmentService.updateAppointment(id, { status });
      toast.success('Appointment status updated!');
      loadData();
    } catch (error) {
      console.error('Failed to update appointment:', error);
    }
  };

  const handleCancelAppointment = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await appointmentService.updateAppointment(id, { status: 'cancelled' });
        toast.success('Appointment cancelled!');
        loadData();
      } catch (error) {
        console.error('Failed to cancel appointment:', error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="card">
        <div className="flex flex-between flex-align-center mb-1">
          <h2>Appointment Management</h2>
          <div className="flex gap-1 flex-align-center">
            <div>
              <label>Date: </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="form-control"
                style={{ width: 'auto', display: 'inline-block' }}
              />
            </div>
            <button className="btn btn-primary" onClick={() => setShowBookModal(true)}>
              Book Appointment
            </button>
          </div>
        </div>

        <AppointmentList
          appointments={appointments}
          onUpdateStatus={handleUpdateStatus}
          onCancelAppointment={handleCancelAppointment}
        />
      </div>

      <BookAppointmentModal
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        onSubmit={handleBookAppointment}
        doctors={doctors}
      />
    </div>
  );
};

export default AppointmentManagement;
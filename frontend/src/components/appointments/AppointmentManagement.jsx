import React, { useState, useEffect } from "react";
import { toast,ToastContainer } from "react-toastify";
import { appointmentService } from "../../services/appointments";
import { doctorService } from "../../services/doctors";
import AppointmentList from "./AppointmentList";
import BookAppointmentModal from "./BookAppointmentModal";
import LoadingSpinner from "../common/LoadingSpinner";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookModal, setShowBookModal] = useState(false);
  const [rescheduleData, setRescheduleData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  const loadData = async () => {
    try {
      const [appointmentsData, doctorsData] = await Promise.all([
        appointmentService.getAllAppointments(selectedDate),
        doctorService.getAllDoctors(),
      ]);
      setAppointments(appointmentsData);
      setDoctors(doctorsData);
    } catch (error) {
      console.error("Failed to load data:", error);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

const handleBookAppointment = async (appointmentData) => {
  try {
    if (!appointmentData.doctorId || !appointmentData.appointmentDate || !appointmentData.appointmentTime) {
      toast.error("Please select doctor, date and time");
      return;
    }

    await appointmentService.createAppointment(appointmentData);

    toast.success("Appointment booked successfully!");
    loadData();
  } catch (error) {
    console.error("Failed to book appointment:", error);

    // Correctly check for Axios response
    if (error.response?.status === 400) {
      console.log("Anuj handling error");
      const backendMessage = error.response.data?.message;
      toast.error(backendMessage || "Doctor is not available at this time.");
    } else {
      console.log("Failed to book");
      toast.error("Failed to book appointment!");
    }
  }
};




  const handleUpdateStatus = async (id, updateData) => {
  try {
    await appointmentService.updateAppointment(id, updateData);
    toast.success("Appointment rescheduled!");
    loadData();
    setShowBookModal(false);
    setRescheduleData(null);
  } catch (error) {
    console.error("Failed to update appointment:", error);
    toast.error("Failed to update appointment!");
  }
};

  const handleCancelAppointment = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await appointmentService.updateAppointment(id, { status: "cancelled" });
        toast.info("Appointment cancelled!");
        loadData();
      } catch (error) {
        console.error("Failed to cancel appointment:", error);
        toast.error("Failed to cancel appointment!");
      }
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this cancelled appointment?")
    ) {
      try {
        await appointmentService.deleteAppointment(id);
        toast.success("Appointment deleted!");
        loadData();
      } catch (error) {
        console.error("Failed to delete appointment:", error);
        toast.error("Failed to delete appointment!");
      }
    }
  };

  const handleRescheduleAppointment = (appointment) => {
    setRescheduleData(appointment);
    setShowBookModal(true);
  };


  const handleModalSubmit = (data) => {
  if (rescheduleData) {
    const updateData = {
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      doctorId: data.doctorId,
      status: "booked",
    };
    handleUpdateStatus(data.id, updateData);
  } else {
    handleBookAppointment(data);
  }
};


  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4 sm:p-6">
      <div className="bg-gray-900 text-gray-100 rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-800">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-400">
            Appointment Management
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-md px-2 sm:px-3 py-1 sm:py-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 transition px-4 sm:px-5 py-2 rounded-lg text-white text-sm sm:text-base font-medium shadow-md"
              onClick={() => {
                setShowBookModal(true);
                setRescheduleData(null); // fresh booking
              }}
            >
              + Book Appointment
            </button>
          </div>
        </div>

        {/* Appointment List */}
        <div className="overflow-x-auto">
          <AppointmentList
            appointments={appointments}
            onUpdateStatus={handleUpdateStatus}
            onCancelAppointment={handleCancelAppointment}
            onDeleteAppointment={handleDeleteAppointment}
            onRescheduleAppointment={handleRescheduleAppointment}
          />
        </div>
      </div>

      {/* Modal */}
      <BookAppointmentModal
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        onSubmit={handleModalSubmit}
        doctors={doctors}
        rescheduleData={rescheduleData}
      />
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AppointmentManagement;

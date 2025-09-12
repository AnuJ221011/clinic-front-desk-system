import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
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
      if (
        !appointmentData.doctorId ||
        !appointmentData.appointmentDate ||
        !appointmentData.appointmentTime
      ) {
        toast.error("Please select doctor, date and time");
        return;
      }

      await appointmentService.createAppointment(appointmentData);

      toast.success("Appointment booked successfully!");
      loadData();
    } catch (error) {
      console.error("Failed to book appointment:", error);

      if (error.response?.status === 400) {
        const backendMessage = error.response.data?.message;
        toast.error(backendMessage || "Doctor is not available at this time.");
      } else {
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
    handleUpdateStatus(rescheduleData.id, updateData);
  } else {
    handleBookAppointment(data);
  }
};

  if (loading) return <LoadingSpinner />;

  // ---- Stats ----
  const appointmentStats = {
    total: appointments.length,
    booked: appointments.filter(a => a.status === "booked").length,
    completed: appointments.filter(a => a.status === "completed").length,
    cancelled: appointments.filter(a => a.status === "cancelled").length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total */}
        <StatCard
          value={appointmentStats.total}
          label="Total Appointments"
          gradient="from-emerald-500/20 to-blue-500/20"
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z" />
          }
        />
        {/* Booked */}
        <StatCard
          value={appointmentStats.booked}
          label="Booked"
          gradient="from-yellow-500/20 to-orange-500/20"
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          }
        />
        {/* Completed */}
        <StatCard
          value={appointmentStats.completed}
          label="Completed"
          gradient="from-blue-500/20 to-indigo-500/20"
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          }
        />
        {/* Cancelled */}
        <StatCard
          value={appointmentStats.cancelled}
          label="Cancelled"
          gradient="from-red-500/20 to-pink-500/20"
          icon={
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          }
        />
      </div>

      {/* Main Panel */}
      <div className="relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl"></div>
        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 sm:gap-0">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Appointment Management
                </h2>
                <p className="text-gray-400 mt-1">Manage patient appointments</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-300 font-semibold">
                  Select Date:
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-white/10 border border-white/25 text-gray-200 text-sm rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
              <button
                className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => {
                  setShowBookModal(true);
                  setRescheduleData(null); // fresh booking
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="hidden sm:inline">Book Appointment</span>
                  <span className="sm:hidden">Book</span>
                </span>
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

        {/* Decorative bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 opacity-60 rounded-t-3xl"></div>
      </div>

      {/* Book Appointment Modal */}
      <BookAppointmentModal
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        onSubmit={handleModalSubmit}
        doctors={doctors}
        rescheduleData={rescheduleData}
      />

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

// Reusable Stat Card component 
const StatCard = ({ value, label, gradient, icon }) => (
  <div className="relative group">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-sm group-hover:blur-none transition-all duration-300`}></div>
    <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 sm:p-6 hover:bg-white/15 transition-all duration-300">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icon}
          </svg>
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-bold text-white">{value}</p>
          <p className="text-gray-400 text-sm">{label}</p>
        </div>
      </div>
    </div>
  </div>
);

export default AppointmentManagement;

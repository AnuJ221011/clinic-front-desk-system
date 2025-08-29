export const API_ENDPOINTS = {
  AUTH: '/auth',
  DOCTORS: '/doctors',
  APPOINTMENTS: '/appointments',
  QUEUE: '/queue'
};

export const APPOINTMENT_STATUS = {
  BOOKED: 'booked',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const QUEUE_STATUS = {
  WAITING: 'waiting',
  WITH_DOCTOR: 'with_doctor',
  COMPLETED: 'completed'
};

export const SPECIALIZATIONS = [
  'General Medicine',
  'Cardiology',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
  'Gynecology',
  'Neurology',
  'Psychiatry',
  'Ophthalmology',
  'ENT'
];

export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30'
];

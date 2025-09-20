# 🏥 Clinic Front Desk Management System

![Dashboard Screenshot](frontend/public/dashboard.png)


A **full-stack MERN-style application** (React + Node.js + Express + PostgreSQL) for managing a clinic's front desk operations.  
This system supports **doctor management, appointment booking, and patient queue management** with secure authentication.

---

## 🚀 Features

- 🔐 **Authentication & Authorization**
  - User registration & login
  - JWT-based authentication
  - Role-based access control


- 👨‍⚕️ **Doctor Management**
  - Add, update, delete doctors
  - View list of doctors
  - Assign specialties

- 📅 **Appointment Scheduling**
  - Book appointments with doctors
  - Reschedule, cancel, or update status
  - List all appointments for a given date

- 🧑‍🤝‍🧑 **Patient Queue Management**
  - Add patients to queue
  - Update queue status
  - Track real-time queue list

- 🎨 **Frontend (React)**
  - User-friendly interface
  - Modal-based booking & editing
  - Reusable components (Header, Spinner, Modal)

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React
- React Router
- Axios
- TailwindCSS
- React Toastify

### Backend
- 🟢 Node.js
- ⚡ Express.js
- 🐘 PostgreSQL with `pg`
- JWT Authentication
- dotenv, cors

---

## 📂 Project Structure

```
clinic-front-desk-system/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── appointmentController.js
│   │   ├── authController.js
│   │   ├── doctorController.js
│   │   └── queueController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── authorize.js
│   ├── routes/
│   │   ├── appointments.js
│   │   ├── auth.js
│   │   ├── doctors.js
│   │   └── queue.js
│   ├── .env                    # Environment variables (local only)
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── appointments/
    │   │   │   ├── AppointmentList.jsx
    │   │   │   ├── AppointmentManagement.jsx
    │   │   │   └── BookAppointmentModal.jsx
    │   │   ├── auth/
    │   │   │   ├── Login.jsx
    │   │   │   └── Register.jsx
    │   │   ├── common/
    │   │   │   ├── Header.jsx
    │   │   │   ├── LoadingSpinner.jsx
    │   │   │   └── Modal.jsx
    │   │   ├── doctors/
    │   │   │   ├── DoctorList.jsx
    │   │   │   ├── DoctorManagement.jsx
    │   │   │   └── DoctorModal.jsx
    │   │   └── queue/
    │   │       ├── AddPatientModal.jsx
    │   │       ├── QueueList.jsx
    │   │       └── QueueManagement.jsx
    │   ├── services/
    │   │   ├── api.js
    │   │   ├── appointments.js
    │   │   ├── auth.js
    │   │   ├── doctors.js
    │   │   └── queue.js
    │   └── App.jsx
    ├── package.json
    └── package-lock.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/AnuJ221011/clinic-front-desk-system.git
cd clinic-front-desk-system
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/clinicdb
JWT_SECRET=your_jwt_secret
```

Start the backend server:
```bash
npm start
```

### 3️⃣ Setup Frontend
```bash
cd frontend
npm install
npm start
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` → Register new user
- `POST /api/auth/login` → Login & get token

### Doctors
- `GET /api/doctors` → List doctors
- `POST /api/doctors` → Add doctor
- `PUT /api/doctors/:id` → Update doctor
- `DELETE /api/doctors/:id` → Remove doctor

### Appointments
- `GET /api/appointments` → List appointments
- `POST /api/appointments` → Book appointment
- `PUT /api/appointments/:id` → Update status/reschedule
- `DELETE /api/appointments/:id` → Cancel appointment

### Queue
- `GET /api/queue` → List queue
- `POST /api/queue` → Add patient
- `PUT /api/queue/:id` → Update queue status
- `DELETE /api/queue/:id` → Remove patient

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).
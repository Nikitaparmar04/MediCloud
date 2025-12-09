# Medicare Hub Backend API

MERN Stack Backend for Medicare Hub - Medical Report Management System

## 🚀 Features

- **User Authentication** (JWT-based)
  - Patient & Doctor registration
  - Login/Logout
  - Protected routes with role-based access

- **Medical Reports Management**
  - Upload reports (PDF, Images)
  - View patient reports
  - Download reports
  - Delete reports

- **Doctor Features**
  - View all patients
  - View patient medical history
  - Add notes/prescriptions for patients

## 📋 Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)
- npm or yarn

## 🔧 Installation

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables**
Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/medicare_hub
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
UPLOAD_PATH=./uploads/reports
MAX_FILE_SIZE=10485760
FRONTEND_URL=http://localhost:5173
```

3. **Start MongoDB**
- Local: Make sure MongoDB is running on `localhost:27017`
- Atlas: Use your MongoDB Atlas connection string

4. **Run the server**
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `POST /api/auth/logout` - Logout (Protected)

### Reports (Patient)
- `POST /api/reports/upload` - Upload report (Protected, Patient only)
- `GET /api/reports` - Get all patient reports (Protected, Patient only)
- `GET /api/reports/:id` - Get single report (Protected)
- `GET /api/reports/file/:id` - Download report file (Protected)
- `DELETE /api/reports/:id` - Delete report (Protected, Patient only)

### Doctor
- `GET /api/doctor/patients` - Get all patients (Protected, Doctor only)
- `GET /api/doctor/patient/:id` - Get patient details (Protected, Doctor only)
- `GET /api/doctor/patient/:id/reports` - Get patient reports (Protected, Doctor only)
- `POST /api/doctor/patient/:id/notes` - Add patient note (Protected, Doctor only)
- `GET /api/doctor/patient/:id/notes` - Get patient notes (Protected, Doctor only)

## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 📁 File Upload

- Supported formats: PDF, JPEG, JPG, PNG
- Max file size: 10MB (configurable)
- Files are stored in `./uploads/reports/`
- For AWS deployment, change `UPLOAD_PATH` to EFS mount point

## 🗄 Database Schemas

### User
- name, email, password, role (patient/doctor)

### Report
- patientId, fileName, filePath, uploadedOn, remarks, doctorId

### PatientNote
- patientId, doctorId, note, prescription, createdAt

## 🌩 AWS Deployment Ready

- File uploads can be stored on EFS
- MongoDB Atlas compatible
- Environment-based configuration
- CORS configured for frontend

## 📝 Example Requests

### Register Patient
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "patient"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Upload Report
```bash
POST /api/reports/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

report: <file>
remarks: "Annual checkup report"
```

## 🐛 Error Handling

All errors return JSON format:
```json
{
  "message": "Error message",
  "errors": [] // for validation errors
}
```

## 📦 Project Structure

```
backend/
├── config/
│   ├── database.js
│   └── multer.config.js
├── middleware/
│   └── auth.middleware.js
├── models/
│   ├── User.model.js
│   ├── Report.model.js
│   └── PatientNote.model.js
├── routes/
│   ├── auth.routes.js
│   ├── report.routes.js
│   └── doctor.routes.js
├── utils/
│   └── generateToken.js
├── uploads/
│   └── reports/
├── server.js
├── package.json
└── .env
```

## 🔒 Security Notes

- Passwords are hashed using bcrypt
- JWT tokens expire after 7 days (configurable)
- File uploads validated by type and size
- Role-based access control implemented
- CORS configured for frontend origin

## 📞 Support

For issues or questions, check the frontend README or project documentation.

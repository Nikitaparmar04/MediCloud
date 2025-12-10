# MediCloud Hub - Complete API Routes Documentation

> Generated from codebase scan on 2025-12-10

---

## Summary

| Route Prefix | Router File | Total Endpoints |
|--------------|-------------|-----------------|
| `/api/auth` | `auth.routes.js` | 4 |
| `/api/reports` | `report.routes.js` | 5 |
| `/api/doctor` | `doctor.routes.js` | 5 |
| **Server-level** | `server.js` | 1 |
| **Total** | | **15** |

---

## Server-Level Routes (server.js)

| Method | Full URL Path | Description | Access |
|--------|---------------|-------------|--------|
| `GET` | `/api/health` | Health check endpoint | Public |

---

## Auth Routes — Prefix: `/api/auth`

**Router File:** `routes/auth.routes.js`

| Method | Endpoint | Full URL Path | Description | Access |
|--------|----------|---------------|-------------|--------|
| `POST` | `/register` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/login` | `/api/auth/login` | Login user | Public |
| `GET` | `/me` | `/api/auth/me` | Get current user | Private |
| `POST` | `/logout` | `/api/auth/logout` | Logout user (client-side token removal) | Private |

---

## Report Routes — Prefix: `/api/reports`

**Router File:** `routes/report.routes.js`

| Method | Endpoint | Full URL Path | Description | Access |
|--------|----------|---------------|-------------|--------|
| `POST` | `/upload` | `/api/reports/upload` | Upload a medical report | Private (Patient only) |
| `GET` | `/` | `/api/reports` | Get all reports for logged-in patient | Private (Patient only) |
| `GET` | `/:id` | `/api/reports/:id` | Get single report by ID | Private (Patient or Doctor) |
| `GET` | `/file/:id` | `/api/reports/file/:id` | Download/view report file | Private (Patient or Doctor) |
| `DELETE` | `/:id` | `/api/reports/:id` | Delete a report | Private (Patient only) |

---

## Doctor Routes — Prefix: `/api/doctor`

**Router File:** `routes/doctor.routes.js`

> **Note:** All doctor routes require authentication + doctor role

| Method | Endpoint | Full URL Path | Description | Access |
|--------|----------|---------------|-------------|--------|
| `GET` | `/patients` | `/api/doctor/patients` | Get all patients | Private (Doctor only) |
| `GET` | `/patient/:id` | `/api/doctor/patient/:id` | Get patient details | Private (Doctor only) |
| `GET` | `/patient/:id/reports` | `/api/doctor/patient/:id/reports` | Get all reports for a specific patient | Private (Doctor only) |
| `POST` | `/patient/:id/notes` | `/api/doctor/patient/:id/notes` | Add a note for a patient | Private (Doctor only) |
| `GET` | `/patient/:id/notes` | `/api/doctor/patient/:id/notes` | Get all notes for a patient | Private (Doctor only) |

---

## Static File Serving

| Path | Description |
|------|-------------|
| `/uploads/*` | Serves uploaded files statically from the uploads directory |

---

## All Routes (Quick Reference)

```
GET     /api/health
POST    /api/auth/register
POST    /api/auth/login
GET     /api/auth/me
POST    /api/auth/logout
POST    /api/reports/upload
GET     /api/reports
GET     /api/reports/:id
GET     /api/reports/file/:id
DELETE  /api/reports/:id
GET     /api/doctor/patients
GET     /api/doctor/patient/:id
GET     /api/doctor/patient/:id/reports
POST    /api/doctor/patient/:id/notes
GET     /api/doctor/patient/:id/notes
```

---

## Route Configuration in server.js

```javascript
// Health check route
app.get('/api/health', ...)

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/doctor', doctorRoutes);

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

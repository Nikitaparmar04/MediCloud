# Backend Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Create `.env` File
Create a `.env` file in the `backend` folder with these variables:

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

**Important:** 
- Change `JWT_SECRET` to a strong random string in production
- For MongoDB Atlas, use: `mongodb+srv://username:password@cluster.mongodb.net/medicare_hub`

### 3. Start MongoDB
Make sure MongoDB is running:
- **Local:** Start MongoDB service
- **Atlas:** Your connection string is already in `.env`

### 4. Run the Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will start on `http://localhost:5000`

### 5. Test the API
Open browser or use Postman:
```
GET http://localhost:5000/api/health
```

Should return: `{ "status": "OK", "message": "Medicare Hub API is running" }`

## Testing Registration & Login

### Register a Patient
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "patient"
}
```

### Register a Doctor
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Dr. Smith",
  "email": "doctor@example.com",
  "password": "password123",
  "role": "doctor"
}
```

### Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response will include `user` object with `token`. Use this token in Authorization header for protected routes.

## Frontend Connection

Make sure your frontend `.env` has:
```env
VITE_API_URL=http://localhost:5000/api
```

Or the frontend will default to `http://localhost:5000/api`

## Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env`
- For Atlas, check network access settings

### Port Already in Use
- Change `PORT` in `.env` to another port (e.g., 5001)
- Update frontend `VITE_API_URL` accordingly

### File Upload Issues
- Check `uploads/reports` folder exists (auto-created)
- Verify `MAX_FILE_SIZE` is sufficient
- Check file permissions

## Next Steps

1. ✅ Backend is running
2. ✅ Test registration/login
3. ✅ Connect frontend
4. ✅ Test file uploads
5. Ready for AWS deployment!

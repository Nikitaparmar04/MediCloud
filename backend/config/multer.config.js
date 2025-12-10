import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =============================================================
// EFS Path for Production (EC2 Linux) - ASG Compatible
// Local Path for Development (Windows/Mac)
// =============================================================
const EFS_UPLOAD_PATH = '/mnt/efs/reports';
const LOCAL_UPLOAD_PATH = path.join(__dirname, '../uploads/reports');

// Smart switch: Use EFS if available (EC2), else use local uploads (Dev)
let uploadDir;
if (fs.existsSync('/mnt/efs')) {
  // Production: EFS is mounted
  uploadDir = EFS_UPLOAD_PATH;
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  console.log('📁 Using EFS storage:', uploadDir);
} else {
  // Development: Use local uploads folder
  uploadDir = LOCAL_UPLOAD_PATH;
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  console.log('📁 Using local storage:', uploadDir);
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-originalname (EFS compatible)
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allow PDF and images
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, JPEG, JPG, and PNG are allowed.'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 // 10MB default
  },
  fileFilter: fileFilter
});

export default upload;

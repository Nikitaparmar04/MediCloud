import express from 'express';
import { body, validationResult } from 'express-validator';
import Report from '../models/Report.model.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import upload from '../config/multer.config.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// @route   POST /api/reports/upload
// @desc    Upload a medical report
// @access  Private (Patient only)
router.post('/upload', 
  protect, 
  authorize('patient'),
  upload.single('report'),
  [
    body('remarks').optional().trim()
  ],
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'Please upload a file' });
      }

      const { remarks } = req.body;

      // Create report record
      const report = await Report.create({
        patientId: req.user._id,
        fileName: req.file.filename,
        originalName: req.file.originalname,
        filePath: req.file.path,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
        remarks: remarks || ''
      });

      // Populate patient info
      await report.populate('patientId', 'name email');

      res.status(201).json({
        message: 'Report uploaded successfully',
        report
      });
    } catch (error) {
      console.error('Upload error:', error);
      
      // Delete uploaded file if report creation failed
      if (req.file && req.file.path) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (unlinkError) {
          console.error('Error deleting file:', unlinkError);
        }
      }

      res.status(500).json({ 
        message: error.message || 'Server error during upload' 
      });
    }
  }
);

// @route   GET /api/reports
// @desc    Get all reports for logged-in patient
// @access  Private (Patient only)
router.get('/', protect, authorize('patient'), async (req, res) => {
  try {
    const reports = await Report.find({ patientId: req.user._id })
      .populate('doctorId', 'name email')
      .sort({ uploadedOn: -1 });

    res.json({
      count: reports.length,
      reports
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/reports/:id
// @desc    Get single report by ID
// @access  Private (Patient or Doctor)
router.get('/:id', protect, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('patientId', 'name email')
      .populate('doctorId', 'name email');

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Check access: Patient can only see their own reports
    // Doctor can see any report
    if (req.user.role === 'patient' && report.patientId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this report' });
    }

    res.json({ report });
  } catch (error) {
    console.error('Get report error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid report ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/reports/file/:id
// @desc    Download/view report file
// @access  Private (Patient or Doctor)
router.get('/file/:id', protect, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Check access
    if (req.user.role === 'patient' && report.patientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this file' });
    }

    // Check if file exists
    if (!fs.existsSync(report.filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }

    // Send file
    res.sendFile(path.resolve(report.filePath));
  } catch (error) {
    console.error('Get file error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid report ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/reports/:id
// @desc    Delete a report
// @access  Private (Patient only)
router.delete('/:id', protect, authorize('patient'), async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Check ownership
    if (report.patientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this report' });
    }

    // Delete file from filesystem
    if (fs.existsSync(report.filePath)) {
      fs.unlinkSync(report.filePath);
    }

    // Delete report from database
    await Report.findByIdAndDelete(req.params.id);

    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Delete report error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid report ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

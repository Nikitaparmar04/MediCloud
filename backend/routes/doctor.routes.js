import express from 'express';
import User from '../models/User.model.js';
import Report from '../models/Report.model.js';
import PatientNote from '../models/PatientNote.model.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// All routes require doctor role
router.use(protect);
router.use(authorize('doctor'));

// @route   GET /api/doctor/patients
// @desc    Get all patients
// @access  Private (Doctor only)
router.get('/patients', async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' })
      .select('name email createdAt')
      .sort({ createdAt: -1 });

    res.json({
      count: patients.length,
      patients
    });
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/doctor/patient/:id
// @desc    Get patient details
// @access  Private (Doctor only)
router.get('/patient/:id', async (req, res) => {
  try {
    const patient = await User.findById(req.params.id)
      .select('name email createdAt');

    if (!patient || patient.role !== 'patient') {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({ patient });
  } catch (error) {
    console.error('Get patient error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid patient ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/doctor/patient/:id/reports
// @desc    Get all reports for a specific patient
// @access  Private (Doctor only)
router.get('/patient/:id/reports', async (req, res) => {
  try {
    // Verify patient exists
    const patient = await User.findById(req.params.id);
    if (!patient || patient.role !== 'patient') {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const reports = await Report.find({ patientId: req.params.id })
      .populate('patientId', 'name email')
      .sort({ uploadedOn: -1 });

    res.json({
      patient: {
        _id: patient._id,
        name: patient.name,
        email: patient.email
      },
      count: reports.length,
      reports
    });
  } catch (error) {
    console.error('Get patient reports error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid patient ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/doctor/patient/:id/notes
// @desc    Add a note for a patient
// @access  Private (Doctor only)
router.post('/patient/:id/notes', 
  [
    body('note').trim().notEmpty().withMessage('Note is required'),
    body('prescription').optional().trim()
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

      // Verify patient exists
      const patient = await User.findById(req.params.id);
      if (!patient || patient.role !== 'patient') {
        return res.status(404).json({ message: 'Patient not found' });
      }

      const { note, prescription } = req.body;

      const patientNote = await PatientNote.create({
        patientId: req.params.id,
        doctorId: req.user._id,
        note,
        prescription: prescription || ''
      });

      await patientNote.populate('patientId', 'name email');
      await patientNote.populate('doctorId', 'name email');

      res.status(201).json({
        message: 'Note added successfully',
        note: patientNote
      });
    } catch (error) {
      console.error('Add note error:', error);
      if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid patient ID' });
      }
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   GET /api/doctor/patient/:id/notes
// @desc    Get all notes for a patient
// @access  Private (Doctor only)
router.get('/patient/:id/notes', async (req, res) => {
  try {
    // Verify patient exists
    const patient = await User.findById(req.params.id);
    if (!patient || patient.role !== 'patient') {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const notes = await PatientNote.find({ patientId: req.params.id })
      .populate('doctorId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      patient: {
        _id: patient._id,
        name: patient.name,
        email: patient.email
      },
      count: notes.length,
      notes
    });
  } catch (error) {
    console.error('Get notes error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid patient ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

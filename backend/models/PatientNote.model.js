import mongoose from 'mongoose';

const patientNoteSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Patient ID is required']
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Doctor ID is required']
  },
  note: {
    type: String,
    required: [true, 'Note is required'],
    trim: true
  },
  prescription: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const PatientNote = mongoose.model('PatientNote', patientNoteSchema);

export default PatientNote;

import mongoose from 'mongoose';

const RemedySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    qtd: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);
const PrescriptionSchema = mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: [true, 'Médico é obrigatório'],
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Paciente é obrigatório'],
    },
    remedy: {
      type: [RemedySchema],
      required: [true, 'Remédio é obrigatório'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Prescription', PrescriptionSchema);

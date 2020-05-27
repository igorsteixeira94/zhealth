import mongoose from 'mongoose';

const PatientSchema = mongoose.Schema(
  {
    cpf: {
      type: String,
      unique: true,
      required: [true, 'CPF do paciente é obrigatório'],
    },
    name: {
      type: String,
      required: [true, 'O nome do paciente é obrigatório'],
    },
    dateBirth: {
      type: Date,
      required: [true, 'A data do paciente é obrigatória'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Patient', PatientSchema);

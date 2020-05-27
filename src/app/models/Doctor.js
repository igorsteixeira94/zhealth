import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const DoctorSchema = mongoose.Schema(
  {
    cpf: {
      type: String,
      unique: true,
      required: [true, 'CPF é obrigatorio'],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, 'Email é obrigatorio'],
    },
    name: {
      type: String,
      required: [true, 'Nome é obrigatorio'],
    },
    dateBirth: {
      type: Date,
      required: [true, 'Data é obrigatoria'],
    },
    crm_cod: {
      type: String,
      required: [true, 'CRM_COD é obrigatorio'],
    },
    crm_state: {
      type: String,
      required: [true, 'CRM_STATE é obrigatorio'],
    },
    gender: {
      type: String,
      required: [true, 'Gênero é obrigatorio'],
    },
    password: {
      type: String,
      required: [true, 'Password é obrigatorio'],
      select: false,
    },
  },
  { timestamps: true }
);

// pre hook for encrypt password
DoctorSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  user.password = await bcrypt.hash(user.password, 8);

  return next();
});

// password authentication in logon
DoctorSchema.method('authPassword', async function (password) {
  const math = await bcrypt.compare(password, this.password);
  return math;
});

export default mongoose.model('Doctor', DoctorSchema);

import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import Doctor from '../models/Doctor';

class SessionController {
  async index(req, res, next) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json('Dados invalidos');

    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email }).select('+password');

    if (!doctor || !(await doctor.authPassword(password)))
      return res.status(403).json('Usuario e/ou Senha incorretos');

    const token = jwt.sign({ id: doctor._id }, 'secret', {
      expiresIn: '7d',
    });

    return res.json({ doctor, token });
  }
}

export default new SessionController();

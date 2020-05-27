import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import Doctor from '../models/Doctor';
import AppError from '../../errors/AppError';
import authConfig from '../../config/authConfig';

class SessionController {
  async index(req, res, next) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body)))
        throw new AppError('Dados Invalido');

      const { email, password } = req.body;

      const doctor = await Doctor.findOne({ email }).select('+password');

      if (!doctor || !(await doctor.authPassword(password)))
        throw new AppError('Usuario e/ou Senha incorretos', 401);

      const token = jwt.sign({ id: doctor._id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });

      return res.json({ doctor, token });
    } catch (error) {
      return next(new AppError('Token Invalido', 401));
    }
  }
}

export default new SessionController();

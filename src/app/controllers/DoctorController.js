import * as Yup from 'yup';
import Doctor from '../schemas/Doctor';
import AppError from '../../errors/AppError';

class DoctorController {
  // Finalizado
  async store(request, response, next) {
    try {
      const {
        cpf,
        email,
        name,
        dateBirth,
        crm_cod,
        crm_state,
        gender,
        password,
      } = request.body;

      const schema = Yup.object().shape({
        cpf: Yup.string().required(),
        email: Yup.string().email().required(),
        name: Yup.string().required(),
        dateBirth: Yup.string().required(),
        crm_cod: Yup.string().required(),
        crm_state: Yup.string().required(),
        gender: Yup.string().required(),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        confirm_password: Yup.string()
          .required()
          .oneOf([Yup.ref('password'), null], 'As senhas não são iguais'),
      });

      if (!(await schema.isValid(request.body)))
        throw new AppError('Dados invalidos', 400);

      const doctorExist = await Doctor.findOne({ cpf });
      if (doctorExist) throw new AppError('Médico já possui cadastro', 400);

      const emailExist = await Doctor.findOne({ email });
      if (emailExist)
        throw new AppError('Este email já pertence a um médico', 400);

      const doctor = await Doctor.create({
        cpf,
        email,
        name,
        dateBirth: new Date(dateBirth),
        crm_cod,
        crm_state,
        gender,
        password,
      });

      doctor.password = undefined; // apenas para apresentar os dados
      return response.json(doctor);
    } catch (error) {
      return next(error);
    }
  }

  // Finalizado
  async index(request, response, next) {
    try {
      const { page = 1 } = request.query;

      const limitForPage = 10;

      const doctor = await Doctor.find()
        .skip((page - 1) * limitForPage)
        .limit(limitForPage);

      if (!doctor.length)
        throw new AppError('Não existem médicos cadastrados', 400);

      return response.json(doctor);
    } catch (error) {
      return next(error);
    }
  }

  // Finalizado
  async show(request, response, next) {
    try {
      const { id } = request.params;
      const doctor = await Doctor.findById(id);

      if (!doctor)
        throw new AppError(
          'Não existe médico cadastrado com as informações informadas',
          400
        );

      return response.json(doctor);
    } catch (error) {
      return next(error);
    }
  }

  // Finalizado
  async delete(request, response, next) {
    try {
      const { id } = request.params;
      const { deletedCount } = await Doctor.remove({ _id: id });

      if (!deletedCount)
        throw new AppError('Não existe registro para ser deletado', 400);

      return response.json('Registro deletado');
    } catch (error) {
      return next(error);
    }
  }

  // Finalizado
  async update(request, response, next) {
    try {
      // Valido apenas qd trocar a senha, já que os outros dados são opcionais
      const schema = Yup.object().shape({
        old_password: Yup.string().min(6),
        password: Yup.string()
          .min(6)
          .when('old_password', (old_password, field) =>
            old_password ? field.required() : field
          ),
        confirm_password: Yup.string()
          .min(6)
          .when('password', (password, field) =>
            password ? field.required().oneOf([Yup.ref('password')]) : field
          ),
      });

      if (!(await schema.isValid(request.body)))
        throw new AppError('Dados invalidos', 400);

      const { id } = request.params;

      const doctorExist = await Doctor.findById(id).select('+password');

      if (!doctorExist) throw new AppError('Médico não existe', 400);

      const { old_password, password } = request.body;

      if (old_password && !(await doctorExist.authPassword(old_password)))
        throw new AppError('Senha inválida !', 401);

      doctorExist.password = password;
      doctorExist.save();

      delete request.body.password;

      const doctor = await Doctor.findByIdAndUpdate(id, request.body, {
        new: true,
      });

      if (!doctor) throw new AppError('Médico não encontrado', 400);

      return response.json(doctor);
    } catch (error) {
      return next(error);
    }
  }
}

export default new DoctorController();

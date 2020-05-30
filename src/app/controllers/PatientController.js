import * as Yup from 'yup';
import Patient from '../models/Patient';
import AppError from '../../errors/AppError';

class PatientController {
  async store(request, response, next) {
    try {
      const schema = Yup.object().shape({
        cpf: Yup.string().required(),
        name: Yup.string().required(),
        dateBirth: Yup.string().required(),
      });

      if (!(await schema.isValid(request.body)))
        throw new AppError('Dados invalidos');

      const { cpf, name, dateBirth } = request.body;

      const patientExist = await Patient.findOne({ cpf });

      if (patientExist) throw new AppError('Paciente já possui cadastro');

      const patient = await Patient.create({
        cpf,
        name,
        dateBirth: new Date(dateBirth),
      });

      return response.json(patient);
    } catch (error) {
      return next(error);
    }
  }

  async index(request, response, next) {
    try {
      const limitForPage = 10;

      const { page = 1 } = request.query;

      const patient = await Patient.find()
        .skip((page - 1) * limitForPage)
        .limit(limitForPage);

      return response.json(patient);
    } catch (error) {
      return next(error);
    }
  }

  async show(request, response, next) {
    try {
      const { id } = request.params;
      const patient = await Patient.findById(id);

      if (!patient)
        throw new AppError(
          'Não existe paciente cadastrado com as informações informadas',
          400
        );

      return response.json(patient);
    } catch (error) {
      return next(error);
    }
  }

  async delete(request, response, next) {
    try {
      const { id } = request.params;
      const { deletedCount } = await Patient.deleteOne({ _id: id });

      if (!deletedCount)
        throw new AppError('Não existe registro para ser deletado');

      return response.json('Registro deletado');
    } catch (error) {
      return next(error);
    }
  }

  async update(request, response, next) {
    try {
      const { id } = request.params;

      const patient = await Patient.findOneAndUpdate({_id:id}, request.body, {
        new: true,
      });

      if (!patient) throw new AppError('Paciente não encontrado');

      return response.json(patient);
    } catch (error) {
      return next(error);
    }
  }
}
export default new PatientController();

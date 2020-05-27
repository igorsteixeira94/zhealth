import * as Yup from 'yup';
import Prescription from '../models/Prescription';
import Patient from '../models/Patient';
import AppError from '../../errors/AppError';

class PrescriptionController {
  // Finalizado
  async store(request, response, next) {
    try {
      const schema = Yup.object().shape({
        patient_id: Yup.string().required(),
        remedy: Yup.array()
          .of(
            Yup.object().shape({
              name: Yup.string(),
              description: Yup.string(),
              qtd: Yup.string(),
              dosage: Yup.string(),
              frequency: Yup.string(),
            })
          )
          .required(),
      });

      if (!(await schema.isValid(request.body)))
        throw new AppError('Dados invalidos');

      const { patient_id, remedy } = request.body;

      const patient = await Patient.findById(patient_id);

      if (!patient) throw new AppError('Paciente não existe');

      const { doctorId } = request;
      const prescription = await Prescription.create({
        doctor: doctorId,
        patient: patient._id,
        remedy,
      });
      return response.json(prescription);
    } catch (error) {
      return next(error);
    }
  }

  // Finalizado
  async index(request, response, next) {
    try {
      const { doctorId } = request;

      const { page = 1 } = request.query;
      const limitForPage = 10;

      const prescriptions = await Prescription.find({
        doctor: doctorId,
      })
        .limit(limitForPage)
        .skip((page - 1) * limitForPage)
        .populate('doctor')
        .populate('patient');

      if (!prescriptions)
        throw new AppError('Nenhum resultado encontrado', 400);

      return response.json(prescriptions);
    } catch (error) {
      return next(error);
    }
  }

  // Finalizado
  async show(request, response, next) {
    try {
      const {
        doctorId,
        params: { id },
      } = request;

      const prescription = await Prescription.findOne({
        _id: id,
        doctor: doctorId,
      })
        .populate('doctor')
        .populate('patient');

      if (!prescription) throw new AppError('Nenhum resultado encontrado', 400);
      return response.json(prescription);
    } catch (error) {
      return next(error);
    }
  }

  // Finalizado
  async delete(request, response, next) {
    try {
      const {
        doctorId,
        params: { id },
      } = request;

      const { deletedCount } = await Prescription.remove({
        _id: id,
        doctor: doctorId,
      });
      if (!deletedCount) throw new AppError('Nenhum registro encontrado');

      return response.json('Registro deletado');
    } catch (error) {
      return next(error);
    }
  }

  // Finalizado
  async update(request, response, next) {
    try {
      const {
        doctorId,
        params: { id },
        body: { remedy, patient_id },
      } = request;

      if (patient_id && !(await Patient.findById(patient_id)))
        throw new AppError('Paciente não cadastrado');
      const prescription = await Prescription.findOneAndUpdate(
        {
          _id: id,
          doctor: doctorId,
        },
        { remedy },
        {
          new: true,
        }
      );

      return response.json(prescription);
    } catch (error) {
      return next(error);
    }
  }
}
export default new PrescriptionController();

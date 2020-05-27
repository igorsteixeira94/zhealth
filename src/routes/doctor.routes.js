import { Router } from 'express';
import DoctorController from '../app/controllers/DoctorController';

const doctorRoutes = new Router();

doctorRoutes.post('/', DoctorController.store);
doctorRoutes.get('/', DoctorController.index);
doctorRoutes.get('/:id', DoctorController.show);
doctorRoutes.delete('/:id', DoctorController.delete);
doctorRoutes.put('/:id', DoctorController.update);

export default doctorRoutes;

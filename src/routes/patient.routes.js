import { Router } from 'express';
import PatientController from '../app/controllers/PatientController';

const patientRoutes = new Router();

patientRoutes.post('/', PatientController.store);
patientRoutes.get('/', PatientController.index);
patientRoutes.get('/:id', PatientController.show);
patientRoutes.delete('/:id', PatientController.delete);
patientRoutes.put('/:id', PatientController.update);

export default patientRoutes;

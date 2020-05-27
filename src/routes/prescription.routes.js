import { Router } from 'express';
import PrescriptionController from '../app/controllers/PrescriptionController';

const prescriptionRoutes = new Router();
prescriptionRoutes.post('/', PrescriptionController.store);
prescriptionRoutes.get('/', PrescriptionController.index);
prescriptionRoutes.get('/:id', PrescriptionController.show);
prescriptionRoutes.delete('/:id', PrescriptionController.delete);
prescriptionRoutes.put('/:id', PrescriptionController.update);

export default prescriptionRoutes;

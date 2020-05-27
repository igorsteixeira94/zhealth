import { Router } from 'express';
import doctorRoutes from './doctor.routes';
import patientRoutes from './patient.routes';
import prescriptionRoutes from './prescription.routes';
import sessionRoutes from './session.routes';
import authMiddleware from './middlewares/auth';
import errorMiddleware from './middlewares/error';

const routes = new Router();

routes.use('/doctors', doctorRoutes);
routes.use('/patients', authMiddleware, patientRoutes);
routes.use('/prescriptions', authMiddleware, prescriptionRoutes);
routes.use('/sessions', sessionRoutes);
routes.use(errorMiddleware);
export default routes;

import { Router } from 'express';
import SessionController from '../app/controllers/SessionController';

const sessionRoutes = new Router();

sessionRoutes.post('/', SessionController.index);

export default sessionRoutes;

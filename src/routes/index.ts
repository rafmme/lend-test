import { Router } from 'express';
import { authRouter } from './router/create-account.route';

const apiRouter = Router();

apiRouter.use(
  '/api',
  authRouter
);

export default apiRouter;

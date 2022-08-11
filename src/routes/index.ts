import { Router } from 'express';
import { authRouter } from './router/auth.route';

const apiRouter = Router();

apiRouter.use(
  '/api',
  authRouter
);

export default apiRouter;

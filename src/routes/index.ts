import { Router } from 'express';
import { accountRouter } from './router/account-ops.route';
import { authRouter } from './router/create-account.route';

const apiRouter = Router();

apiRouter.use(
  '/api',
  authRouter,
  accountRouter,
);

export default apiRouter;




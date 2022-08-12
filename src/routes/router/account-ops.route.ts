import { Router } from 'express';
import { accountController } from '../../controllers/accounts.controller';

export const accountRouter = Router();

accountRouter.patch('/accounts/fund', accountController.fund);




import { Router } from 'express';
import { accountController } from '../../controllers/accounts.controller';

export const accountRouter = Router();

accountRouter.patch('/accounts/fund', accountController.fund);
accountRouter.patch('/accounts/withdraw', accountController.withdraw);
accountRouter.patch('/accounts/transfer', accountController.transfer);
accountRouter.get('/accounts', accountController.getAll);




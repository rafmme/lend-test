import { Router } from 'express';
import { userController } from '../../controllers/users.controller';

export const authRouter = Router();

authRouter.post('/accounts/new', userController.create);




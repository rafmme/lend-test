import { Router } from 'express';
import { userController } from '../../controllers/user.controller';

export const authRouter = Router();

authRouter.post('/auth/signup', userController.create);




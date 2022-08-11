import express, {
  Application, Request,
  Response, NextFunction
} from 'express';
import { errorHandler } from './middlewares/error-handler.middleware';
import apiRouter from './routes';

const app: Application = express();

app.use(express.json());
app.use(apiRouter);
app.use(errorHandler);

app.use("/", (req: Request, res: Response): void => {
  res.json({
    message: 'Hey there! Welcome to my Lendsqr test API solution',
  });
});
 
     
export default app;


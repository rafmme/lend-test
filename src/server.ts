import app from './app';
import { PORT } from './config';


app.listen(
  PORT,
  (): void => console.log(`running on port ${PORT}`)
);


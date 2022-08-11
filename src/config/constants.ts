import dotenv from 'dotenv';
dotenv.config();


const {
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  PORT: APP_PORT,
  DATABASE_URL,
} = process.env;
  
const PORT: Number = Number.parseInt(APP_PORT!, 10) || 5050;

export {
  DATABASE_URL,
  PORT,
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_USER
};


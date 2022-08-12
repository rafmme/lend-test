import dotenv from 'dotenv';
dotenv.config();


const {
  DB_DATABASE,
  TEST_DATABASE,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  PORT: APP_PORT,
  CLEARDB_DATABASE_URL,
  NODE_ENV,
} = process.env;
  
const PORT: Number = Number.parseInt(APP_PORT!, 10) || 5050;

export {
  CLEARDB_DATABASE_URL,
  PORT,
  DB_DATABASE,
  TEST_DATABASE,
  DB_HOST,
  DB_PORT,
  DB_PASSWORD,
  DB_USER,
  NODE_ENV,
};


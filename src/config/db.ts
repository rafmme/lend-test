import { Knex, knex } from 'knex';
import {
  CLEARDB_DATABASE_URL, DB_DATABASE, DB_HOST, DB_PORT,
  DB_PASSWORD, DB_USER, NODE_ENV, TEST_DATABASE
} from './constants';


let config: Knex.Config = {
    client: 'mysql2',
    connection: {
      host: DB_HOST,
      port: Number.parseInt(DB_PORT!, 10),
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  };

if (NODE_ENV?.toLowerCase() === 'production') {
  config = {
    client: 'mysql2',
    connection: CLEARDB_DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  };
}

if (NODE_ENV?.toLowerCase() === 'test') {
  config = {
    client: 'mysql2',
    connection: {
      host: DB_HOST,
      port: Number.parseInt(DB_PORT!, 10),
      user: DB_USER,
      password: DB_PASSWORD,
      database: TEST_DATABASE,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  };
}

export const knexInstance = knex(config);


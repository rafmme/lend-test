import {
  DB_HOST, DB_USER, DB_PASSWORD, DB_PORT,
  DB_DATABASE, TEST_DATABASE, DATABASE_URL
} from '../config';

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'mysql',
    connection: {
      host: DB_HOST || '127.0.0.1',
      port: DB_PORT || 8889,
      user: DB_USER || 'root',
      password: DB_PASSWORD || 'root',
      database: DB_DATABASE || 'lend_db',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'mysql',
    connection: {
      host: DB_HOST || 'localhost',
      port: DB_PORT || 3306,
      user: DB_USER || 'root',
      password: DB_PASSWORD || 'root',
      database: TEST_DATABASE || 'test_db',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};

import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('fullName', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('securityPassKey').notNullable();
      table.timestamps();
    }).createTable('accounts', (table) => {
        table.increments('id').primary();
        table.string('accountName', 255).notNullable();
        table.string('accountOwner', 255).notNullable().unique()
          .references('users.email').onDelete('cascade');
        table.double('accountBalance').notNullable();
        table.string('securityPassKey').notNullable();
        table.timestamps();
      });;
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
    .dropTable('accounts');
}


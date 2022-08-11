import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  const schema = await knex.schema
    .createTable('users', (table) => {
      table.increments('id');
      table.string('fullName', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('securityPassKey').notNullable();
      table.timestamps();
    });

    return schema;
}


export async function down(knex: Knex): Promise<void> {
  const schema = await knex.schema
    .dropTable('users');

  return schema;
}



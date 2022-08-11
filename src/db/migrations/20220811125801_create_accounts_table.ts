import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  const schema = await knex.schema
    .createTable('accounts', (table) => {
      table.increments('id');
      table.string('accountName', 255).notNullable();
      table.string('accountOwner', 255).notNullable().unique();
      table.double('accountBalance').notNullable();
      table.string('securityPassKey').notNullable();
      table.timestamps();
    });

    return schema;
}


export async function down(knex: Knex): Promise<void> {
  const schema = await knex.schema
    .dropTable('accounts');

  return schema;
}



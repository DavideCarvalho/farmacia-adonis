import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'patients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('full_name').notNullable()
      table.date('birth_date').notNullable()
      table.string('cpf', 11).notNullable().unique()
      table.string('phone', 20).notNullable()
      table.string('address').notNullable()
      table.string('city').notNullable()
      table.string('state', 2).notNullable()
      table.string('zip_code', 8).notNullable()
      table.string('email').notNullable().unique()
      table.boolean('active').notNullable().defaultTo(true)
      table.uuid('created_by').references('id').inTable('users')
      table.uuid('updated_by').references('id').inTable('users')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

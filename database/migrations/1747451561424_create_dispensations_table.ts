import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dispensations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('department_id')
        .notNullable()
        .references('id')
        .inTable('departments')
        .onDelete('CASCADE')
      table
        .uuid('request_id')
        .notNullable()
        .references('id')
        .inTable('medication_requests')
        .onDelete('CASCADE')
      table
        .uuid('dispensed_by_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .uuid('received_by_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.text('notes').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
      table.uuid('created_by').nullable()
      table.uuid('updated_by').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

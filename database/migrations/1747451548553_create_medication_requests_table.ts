import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'medication_requests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('department_id')
        .notNullable()
        .references('id')
        .inTable('departments')
        .onDelete('CASCADE')
      table.uuid('requested_by').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.uuid('approved_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table
        .enum('status', ['PENDING', 'APPROVED', 'REJECTED', 'DISPENSED'])
        .notNullable()
        .defaultTo('PENDING')
      table
        .enum('priority', ['LOW', 'MEDIUM', 'HIGH'])
        .notNullable()
        .defaultTo('MEDIUM')
      table.text('rejection_reason').nullable()
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

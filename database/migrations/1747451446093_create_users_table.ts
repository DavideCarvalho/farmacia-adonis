import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('full_name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table
        .enum('role', [
          'ADMIN',
          'PHARMACIST',
          'PHARMACIST_MANAGER',
          'TECHNICIAN',
          'DEPARTMENT_USER',
        ])
        .notNullable()
      table.uuid('department_id').references('id').inTable('departments').onDelete('SET NULL')
      table.boolean('active').notNullable().defaultTo(true)
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

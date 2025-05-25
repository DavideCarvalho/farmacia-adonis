import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'prescriptions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('patient_id')
        .notNullable()
        .references('id')
        .inTable('patients')
        .onDelete('CASCADE')
      table.uuid('doctor_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.text('diagnosis').notNullable()
      table.text('medications').notNullable()
      table.enum('status', ['pending', 'approved', 'rejected']).defaultTo('pending')
      table.text('pharmacist_notes').nullable()
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

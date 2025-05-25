import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.uuid('pharmacist_id').references('id').inTable('users').onDelete('CASCADE')
      table.uuid('prescription_id').references('id').inTable('prescriptions').onDelete('CASCADE')
      table.enum('type', ['prescription_review']).notNullable()
      table.enum('status', ['unread', 'read']).defaultTo('unread')
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

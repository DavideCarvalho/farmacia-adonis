import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'activities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table
        .enum('type', [
          'LOGIN',
          'LOGOUT',
          'CREATE',
          'UPDATE',
          'DELETE',
          'APPROVE',
          'REJECT',
          'DISPENSE',
          'RECEIVE',
          'OTHER',
        ])
        .notNullable()
      table.string('entity_type').notNullable()
      table.uuid('entity_id').notNullable()
      table.text('description').notNullable()
      table.jsonb('metadata').nullable()
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

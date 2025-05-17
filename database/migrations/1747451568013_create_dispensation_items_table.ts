import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dispensation_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('dispensation_id')
        .notNullable()
        .references('id')
        .inTable('dispensations')
        .onDelete('CASCADE')
      table
        .uuid('medication_id')
        .notNullable()
        .references('id')
        .inTable('medications')
        .onDelete('CASCADE')
      table.uuid('batch_id').notNullable().references('id').inTable('batches').onDelete('CASCADE')
      table.integer('quantity').notNullable()
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

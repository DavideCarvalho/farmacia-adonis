import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'batches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('medication_id')
        .notNullable()
        .references('id')
        .inTable('medications')
        .onDelete('CASCADE')
      table
        .uuid('supplier_id')
        .notNullable()
        .references('id')
        .inTable('suppliers')
        .onDelete('CASCADE')
      table.string('number').notNullable()
      table.date('manufacturing_date').notNullable()
      table.date('expiration_date').notNullable()
      table.integer('quantity').notNullable()
      table.decimal('unit_price', 10, 2).notNullable()
      table.boolean('active').notNullable().defaultTo(true)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
      table.uuid('created_by').nullable()
      table.uuid('updated_by').nullable()

      table.unique(['medication_id', 'number'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

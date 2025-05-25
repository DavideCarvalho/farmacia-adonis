import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'suppliers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('cnpj').notNullable().unique()
      table.string('email').nullable()
      table.string('phone').nullable()
      table.string('address').nullable()
      table.string('city').nullable()
      table.string('state', 2).nullable()
      table.string('zip_code', 8).nullable()
      table.string('contact').nullable()
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

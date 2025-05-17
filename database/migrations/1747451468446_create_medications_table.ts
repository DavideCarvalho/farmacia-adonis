import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'medications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('generic_name').notNullable()
      table.text('description').nullable()
      table.string('dosage').notNullable()
      table
        .enum('form', [
          'COMPRIMIDO',
          'CAPSULA',
          'LIQUIDO',
          'INJETAVEL',
          'POMADA',
          'CREME',
          'GEL',
          'AEROSOL',
          'ADESIVO',
          'OUTRO',
        ])
        .notNullable()
      table.string('category').notNullable()
      table.integer('min_stock').notNullable()
      table.integer('max_stock').notNullable()
      table.boolean('controlled').notNullable().defaultTo(false)
      table.boolean('refrigerated').notNullable().defaultTo(false)
      table.string('barcode').nullable().unique()
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

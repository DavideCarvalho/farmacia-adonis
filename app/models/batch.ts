import type { DateTime } from 'luxon'
import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Medication from './medication.js'
import Supplier from './supplier.js'
import StockItem from './stock_item.js'
import BaseUUIDModel from './utils/base_uuid_model.js'

export default class Batch extends BaseUUIDModel {
  @column()
  public number!: string

  @column()
  public medicationId!: string

  @column()
  public supplierId!: string

  @column.date()
  public manufacturingDate!: DateTime | null

  @column.date()
  public expirationDate!: DateTime

  @column()
  public quantity!: number

  @column()
  public purchasePrice!: number

  @belongsTo(() => Medication)
  public medication!: BelongsTo<typeof Medication>

  @belongsTo(() => Supplier)
  public supplier!: BelongsTo<typeof Supplier>

  @hasMany(() => StockItem)
  public stockItems!: HasMany<typeof StockItem>
}

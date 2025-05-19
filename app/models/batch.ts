import type { DateTime } from 'luxon'
import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Medication from '#models/medication'
import Supplier from '#models/supplier'
import StockItem from '#models/stock_item'
import BaseUUIDModel from '#models/utils/base_uuid_model'

export default class Batch extends BaseUUIDModel {
  @column()
  declare number: string

  @column()
  declare medicationId: string

  @column()
  declare supplierId: string

  @column.date()
  declare manufacturingDate: DateTime | null

  @column.date()
  declare expirationDate: DateTime

  @column()
  declare quantity: number

  @column()
  declare purchasePrice: number

  @belongsTo(() => Medication)
  declare medication: BelongsTo<typeof Medication>

  @belongsTo(() => Supplier)
  declare supplier: BelongsTo<typeof Supplier>

  @hasMany(() => StockItem)
  declare stockItems: HasMany<typeof StockItem>
}

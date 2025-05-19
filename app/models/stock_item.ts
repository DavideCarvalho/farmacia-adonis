import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Medication from '#models/medication'
import Batch from '#models/batch'
import StockMovement from '#models/stock_movement'
import DispensationItem from '#models/dispensation_item'
import BaseUUIDModel from '#models/utils/base_uuid_model'

export default class StockItem extends BaseUUIDModel {
  @column()
  declare medicationId: string

  @column()
  declare batchId: string

  @column()
  declare currentQuantity: number

  @column()
  declare location: string | null

  @belongsTo(() => Medication)
  declare medication: BelongsTo<typeof Medication>

  @belongsTo(() => Batch)
  declare batch: BelongsTo<typeof Batch>

  @hasMany(() => StockMovement)
  declare stockMovements: HasMany<typeof StockMovement>

  @hasMany(() => DispensationItem)
  declare dispensationItems: HasMany<typeof DispensationItem>
}

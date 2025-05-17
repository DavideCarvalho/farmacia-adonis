import type { DateTime } from 'luxon'
import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Medication from './medication.js'
import Batch from './batch.js'
import StockMovement from './stock_movement.js'
import DispensationItem from './dispensation_item.js'
import BaseUUIDModel from './utils/base_uuid_model.js'

export default class StockItem extends BaseUUIDModel {
  @column()
  public medicationId!: string

  @column()
  public batchId!: string

  @column()
  public currentQuantity!: number

  @column()
  public location!: string | null

  @belongsTo(() => Medication)
  public medication!: BelongsTo<typeof Medication>

  @belongsTo(() => Batch)
  public batch!: BelongsTo<typeof Batch>

  @hasMany(() => StockMovement)
  public stockMovements!: HasMany<typeof StockMovement>

  @hasMany(() => DispensationItem)
  public dispensationItems!: HasMany<typeof DispensationItem>
}

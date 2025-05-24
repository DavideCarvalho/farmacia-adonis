import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Medication from '#models/medication'
import Batch from '#models/batch'
import StockMovement from '#models/stock_movement'
import DispensationItem from '#models/dispensation_item'
import { withUUID } from '#models/utils/with_uuid'
import { withTimestamps } from '#models/utils/with_timestamps'
import { withUserTracking } from '#models/utils/with_user_tracking'
import { compose } from '@adonisjs/core/helpers'

export default class StockItem extends compose(
  BaseModel,
  withUUID(),
  withTimestamps(),
  withUserTracking()
) {
  @column()
  declare medicationId: string

  @column()
  declare batchId: string

  @column()
  declare quantity: number

  @column()
  declare location: string | null

  @column()
  declare active: boolean

  @belongsTo(() => Medication)
  declare medication: BelongsTo<typeof Medication>

  @belongsTo(() => Batch)
  declare batch: BelongsTo<typeof Batch>

  @hasMany(() => StockMovement)
  declare stockMovements: HasMany<typeof StockMovement>

  @hasMany(() => DispensationItem)
  declare dispensationItems: HasMany<typeof DispensationItem>
}

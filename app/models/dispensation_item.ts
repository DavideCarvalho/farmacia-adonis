import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Dispensation from '#models/dispensation'
import Medication from '#models/medication'
import StockItem from '#models/stock_item'
import { withUUID } from '#models/utils/with_uuid'
import { withTimestamps } from '#models/utils/with_timestamps'
import { withUserTracking } from '#models/utils/with_user_tracking'
import { compose } from '@adonisjs/core/helpers'

export default class DispensationItem extends compose(
  BaseModel,
  withUUID(),
  withTimestamps(),
  withUserTracking()
) {
  @column()
  declare dispensationId: string

  @column()
  declare medicationId: string

  @column()
  declare stockItemId: string

  @column()
  declare quantity: number

  @column()
  declare batchId: string

  @belongsTo(() => Dispensation)
  declare dispensation: BelongsTo<typeof Dispensation>

  @belongsTo(() => Medication)
  declare medication: BelongsTo<typeof Medication>

  @belongsTo(() => StockItem)
  declare stockItem: BelongsTo<typeof StockItem>
}

import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import StockItem from '#models/stock_item'
import User from '#models/user'
import Dispensation from '#models/dispensation'
import { withUUID } from '#models/utils/with_uuid'
import { withTimestamps } from '#models/utils/with_timestamps'
import { withUserTracking } from '#models/utils/with_user_tracking'
import { compose } from '@adonisjs/core/helpers'

export enum MovementType {
  IN = 'IN',
  OUT = 'OUT',
  ADJUSTMENT = 'ADJUSTMENT',
  RETURN = 'RETURN',
  DISPOSAL = 'DISPOSAL',
}

export default class StockMovement extends compose(
  BaseModel,
  withUUID(),
  withTimestamps(),
  withUserTracking()
) {
  @column()
  declare stockItemId: string

  @column()
  declare type: MovementType

  @column()
  declare quantity: number

  @column()
  declare reason: string | null

  @column()
  declare userId: string

  @column()
  declare dispensationId: string | null

  @belongsTo(() => StockItem)
  declare stockItem: BelongsTo<typeof StockItem>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Dispensation)
  declare dispensation: BelongsTo<typeof Dispensation>
}

import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import StockItem from './stock_item.js'
import User from './user.js'
import Dispensation from './dispensation.js'
import BaseUUIDModel from './utils/base_uuid_model.js'

export enum MovementType {
  IN = 'IN',
  OUT = 'OUT',
  ADJUSTMENT = 'ADJUSTMENT',
  RETURN = 'RETURN',
  DISPOSAL = 'DISPOSAL',
}

export default class StockMovement extends BaseUUIDModel {
  @column()
  public stockItemId!: string

  @column()
  public type!: MovementType

  @column()
  public quantity!: number

  @column()
  public reason!: string | null

  @column()
  public userId!: string

  @column()
  public dispensationId!: string | null

  @belongsTo(() => StockItem)
  public stockItem!: BelongsTo<typeof StockItem>

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>

  @belongsTo(() => Dispensation)
  public dispensation!: BelongsTo<typeof Dispensation>
}

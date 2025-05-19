import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Dispensation from './dispensation.js'
import Medication from './medication.js'
import StockItem from './stock_item.js'
import BaseUUIDModel from './base_uuid_model.js'

export default class DispensationItem extends BaseUUIDModel {
  @column()
  public dispensationId!: string

  @column()
  public medicationId!: string

  @column()
  public stockItemId!: string

  @column()
  public quantity!: number

  @belongsTo(() => Dispensation)
  public dispensation!: BelongsTo<typeof Dispensation>

  @belongsTo(() => Medication)
  public medication!: BelongsTo<typeof Medication>

  @belongsTo(() => StockItem)
  public stockItem!: BelongsTo<typeof StockItem>
}

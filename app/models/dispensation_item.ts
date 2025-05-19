import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Dispensation from '#models/dispensation'
import Medication from '#models/medication'
import StockItem from '#models/stock_item'
import BaseUUIDModel from '#models/utils/base_uuid_model'

export default class DispensationItem extends BaseUUIDModel {
  @column()
  declare dispensationId: string

  @column()
  declare medicationId: string

  @column()
  declare stockItemId: string

  @column()
  declare quantity: number

  @belongsTo(() => Dispensation)
  declare dispensation: BelongsTo<typeof Dispensation>

  @belongsTo(() => Medication)
  declare medication: BelongsTo<typeof Medication>

  @belongsTo(() => StockItem)
  declare stockItem: BelongsTo<typeof StockItem>
}

import type { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Medication from '#models/medication'
import Supplier from '#models/supplier'
import StockItem from '#models/stock_item'
import { withUUID } from '#models/utils/with_uuid'
import { withTimestamps } from '#models/utils/with_timestamps'
import { withUserTracking } from '#models/utils/with_user_tracking'
import { compose } from '@adonisjs/core/helpers'

export default class Batch extends compose(
  BaseModel,
  withUUID(),
  withTimestamps(),
  withUserTracking()
) {
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
  declare unitPrice: number

  @column()
  declare active: boolean

  @belongsTo(() => Medication)
  declare medication: BelongsTo<typeof Medication>

  @belongsTo(() => Supplier)
  declare supplier: BelongsTo<typeof Supplier>

  @hasMany(() => StockItem)
  declare stockItems: HasMany<typeof StockItem>
}

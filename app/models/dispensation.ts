import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Department from '#models/department'
import DispensationItem from '#models/dispensation_item'
import { withUUID } from '#models/utils/with_uuid'
import { withTimestamps } from '#models/utils/with_timestamps'
import { withUserTracking } from '#models/utils/with_user_tracking'
import { compose } from '@adonisjs/core/helpers'
import MedicationRequest from '#models/medication_request'
import StockMovement from '#models/stock_movement'

export default class Dispensation extends compose(
  BaseModel,
  withUUID(),
  withTimestamps(),
  withUserTracking()
) {
  @column()
  declare departmentId: string

  @column()
  declare requestId: string

  @column()
  declare dispensedById: string

  @column()
  declare receivedById: string

  @belongsTo(() => Department)
  declare department: BelongsTo<typeof Department>

  @belongsTo(() => MedicationRequest)
  declare request: BelongsTo<typeof MedicationRequest>

  @belongsTo(() => User)
  declare dispensedBy: BelongsTo<typeof User>

  @belongsTo(() => User)
  declare receivedBy: BelongsTo<typeof User>

  @hasMany(() => DispensationItem)
  declare items: HasMany<typeof DispensationItem>

  @hasMany(() => StockMovement)
  declare stockMovements: HasMany<typeof StockMovement>
}

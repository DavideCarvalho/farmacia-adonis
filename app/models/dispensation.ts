import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Department from '#models/department'
import MedicationRequest from '#models/medication_request'
import User from '#models/user'
import DispensationItem from '#models/dispensation_item'
import StockMovement from '#models/stock_movement'
import BaseUUIDModel from '#models/utils/base_uuid_model'

export default class Dispensation extends BaseUUIDModel {
  @column()
  declare departmentId: string

  @column()
  declare requestId: string | null

  @column()
  declare dispensedById: string

  @belongsTo(() => Department)
  declare department: BelongsTo<typeof Department>

  @belongsTo(() => MedicationRequest)
  declare request: BelongsTo<typeof MedicationRequest>

  @belongsTo(() => User)
  declare dispensedBy: BelongsTo<typeof User>

  @hasMany(() => DispensationItem)
  declare items: HasMany<typeof DispensationItem>

  @hasMany(() => StockMovement)
  declare stockMovements: HasMany<typeof StockMovement>
}

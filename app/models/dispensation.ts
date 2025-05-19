import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Department from './department.js'
import MedicationRequest from './medication_request.js'
import User from './user.js'
import DispensationItem from './dispensation_item.js'
import StockMovement from './stock_movement.js'
import BaseUUIDModel from './base_uuid_model.js'

export default class Dispensation extends BaseUUIDModel {
  @column()
  public departmentId!: string

  @column()
  public requestId!: string | null

  @column()
  public dispensedById!: string

  @belongsTo(() => Department)
  public department!: BelongsTo<typeof Department>

  @belongsTo(() => MedicationRequest)
  public request!: BelongsTo<typeof MedicationRequest>

  @belongsTo(() => User)
  public dispensedBy!: BelongsTo<typeof User>

  @hasMany(() => DispensationItem)
  public items!: HasMany<typeof DispensationItem>

  @hasMany(() => StockMovement)
  public stockMovements!: HasMany<typeof StockMovement>
}

import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Department from './department.js'
import User from './user.js'
import MedicationRequestItem from './medication_request_item.js'
import Dispensation from './dispensation.js'
import BaseUUIDModel from './utils/base_uuid_model.js'

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  DISPENSED = 'DISPENSED',
  CANCELED = 'CANCELED',
}

export enum RequestPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export default class MedicationRequest extends BaseUUIDModel {
  @column()
  public departmentId!: string

  @column()
  public requestedById!: string

  @column()
  public approvedById!: string | null

  @column()
  public status!: RequestStatus

  @column()
  public priority!: RequestPriority

  @column()
  public rejectionReason!: string | null

  @belongsTo(() => Department)
  public department!: BelongsTo<typeof Department>

  @belongsTo(() => User, { foreignKey: 'requestedById' })
  public requestedBy!: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'approvedById' })
  public approvedBy!: BelongsTo<typeof User>

  @hasMany(() => MedicationRequestItem)
  public items!: HasMany<typeof MedicationRequestItem>

  @belongsTo(() => Dispensation)
  public dispensation!: BelongsTo<typeof Dispensation>
}

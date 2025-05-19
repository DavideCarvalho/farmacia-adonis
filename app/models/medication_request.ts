import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Department from '#models/department'
import User from '#models/user'
import MedicationRequestItem from '#models/medication_request_item'
import Dispensation from '#models/dispensation'
import BaseUUIDModel from '#models/utils/base_uuid_model'

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
  declare departmentId: string

  @column()
  declare requestedById: string

  @column()
  declare approvedById: string | null

  @column()
  declare status: RequestStatus

  @column()
  declare priority: RequestPriority

  @column()
  declare rejectionReason: string | null

  @belongsTo(() => Department)
  declare department: BelongsTo<typeof Department>

  @belongsTo(() => User, { foreignKey: 'requestedById' })
  declare requestedBy: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'approvedById' })
  declare approvedBy: BelongsTo<typeof User>

  @hasMany(() => MedicationRequestItem)
  declare items: HasMany<typeof MedicationRequestItem>

  @belongsTo(() => Dispensation)
  declare dispensation: BelongsTo<typeof Dispensation>
}

import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Department from '#models/department'
import Dispensation from '#models/dispensation'
import MedicationRequestItem from '#models/medication_request_item'
import { withUUID } from '#models/utils/with_uuid'
import { withTimestamps } from '#models/utils/with_timestamps'
import { withUserTracking } from '#models/utils/with_user_tracking'
import { compose } from '@adonisjs/core/helpers'

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

export default class MedicationRequest extends compose(
  BaseModel,
  withUUID(),
  withTimestamps(),
  withUserTracking()
) {
  @column()
  declare departmentId: string

  @column({ columnName: 'requested_by' })
  declare requestedById: string

  @column({ columnName: 'approved_by' })
  declare approvedById: string | null

  @column()
  declare status: RequestStatus

  @column()
  declare priority: RequestPriority

  @column({ columnName: 'rejection_reason' })
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

  @belongsTo(() => User)
  declare createdBy: BelongsTo<typeof User>

  @belongsTo(() => User)
  declare updatedBy: BelongsTo<typeof User>
}

import type { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { v7 } from 'uuid'
import Department from '#models/department'
import Activity from '#models/activity'
import MedicationRequest from '#models/medication_request'
import Dispensation from '#models/dispensation'
import StockMovement from '#models/stock_movement'
import Supplier from '#models/supplier'
import { withUUID } from '#models/utils/with_uuid'
import { withTimestamps } from '#models/utils/with_timestamps'
import { withUserTracking } from '#models/utils/with_user_tracking'
import Notification from '#models/notification'
import Patient from '#models/patient'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export enum UserRole {
  ADMIN = 'ADMIN',
  PHARMACIST = 'PHARMACIST',
  PHARMACIST_MANAGER = 'PHARMACIST_MANAGER',
  TECHNICIAN = 'TECHNICIAN',
  DEPARTMENT_USER = 'DEPARTMENT_USER',
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
}

export default class User extends compose(
  BaseModel,
  withUUID(),
  withTimestamps(),
  withUserTracking()
) {
  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: UserRole

  @column()
  declare departmentId: string | null

  @column()
  declare active: boolean

  @belongsTo(() => Department)
  declare department: BelongsTo<typeof Department>

  @hasMany(() => Activity)
  declare activities: HasMany<typeof Activity>

  @hasMany(() => MedicationRequest, { foreignKey: 'requestedById' })
  declare requests: HasMany<typeof MedicationRequest>

  @hasMany(() => MedicationRequest, { foreignKey: 'approvedById' })
  declare approvedRequests: HasMany<typeof MedicationRequest>

  @hasMany(() => Dispensation)
  declare dispensations: HasMany<typeof Dispensation>

  @hasMany(() => StockMovement)
  declare stockMovements: HasMany<typeof StockMovement>

  @hasMany(() => Supplier)
  declare suppliers: HasMany<typeof Supplier>

  @hasMany(() => Notification, {
    foreignKey: 'pharmacistId',
  })
  declare notifications: HasMany<typeof Notification>

  @hasMany(() => User, {
    foreignKey: 'doctorId',
  })
  declare pharmacists: HasMany<typeof User>

  @hasOne(() => Patient, {
    foreignKey: 'userId',
  })
  declare patient: HasOne<typeof Patient>
}

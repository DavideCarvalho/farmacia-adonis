import type { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
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
}

export default class User extends compose(
  BaseModel,
  withUUID(),
  withTimestamps(),
  withUserTracking()
) {
  @column({ isPrimary: true })
  declare id: string

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => User)
  declare createdBy: BelongsTo<typeof User>

  @belongsTo(() => User)
  declare updatedBy: BelongsTo<typeof User>

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

  @beforeCreate()
  public static beforeCreate(model: User) {
    model.id = v7()
  }
}

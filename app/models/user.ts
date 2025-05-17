import type { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { v7 } from 'uuid'
import Department from './department.js'
import Activity from './activity.js'
import MedicationRequest from './medication_request.js'
import Dispensation from './dispensation.js'
import StockMovement from './stock_movement.js'

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

export default class User extends compose(BaseModel, AuthFinder) {
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

  @beforeCreate()
  public static beforeCreate(model: User) {
    model.id = v7()
  }
}

import { column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import MedicationRequest from '#models/medication_request'
import Dispensation from '#models/dispensation'
import BaseUUIDModel from '#models/utils/base_uuid_model'

export default class Department extends BaseUUIDModel {
  @column()
  declare name: string

  @column()
  declare description: string | null

  @hasMany(() => User)
  declare users: HasMany<typeof User>

  @hasMany(() => MedicationRequest)
  declare requests: HasMany<typeof MedicationRequest>

  @hasMany(() => Dispensation)
  declare dispensations: HasMany<typeof Dispensation>
}

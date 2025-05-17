import type { DateTime } from 'luxon'
import { column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import MedicationRequest from './medication_request.js'
import Dispensation from './dispensation.js'
import BaseUUIDModel from './utils/base_uuid_model.js'

export default class Department extends BaseUUIDModel {
  @column()
  public name!: string

  @column()
  public description!: string | null

  @hasMany(() => User)
  public users!: HasMany<typeof User>

  @hasMany(() => MedicationRequest)
  public requests!: HasMany<typeof MedicationRequest>

  @hasMany(() => Dispensation)
  public dispensations!: HasMany<typeof Dispensation>
}

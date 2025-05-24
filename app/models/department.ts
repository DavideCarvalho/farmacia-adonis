import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import MedicationRequest from '#models/medication_request'
import Dispensation from '#models/dispensation'
import { withUUID } from '#models/utils/with_uuid'
import { withTimestamps } from '#models/utils/with_timestamps'
import { withUserTracking } from '#models/utils/with_user_tracking'
import { compose } from '@adonisjs/core/helpers'

export default class Department extends compose(
  BaseModel,
  withUUID(),
  withTimestamps(),
  withUserTracking()
) {
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

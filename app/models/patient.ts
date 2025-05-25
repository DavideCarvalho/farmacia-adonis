import type { DateTime } from 'luxon'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { withUUID } from '#models/utils/with_uuid'
import { withTimestamps } from '#models/utils/with_timestamps'
import { withUserTracking } from '#models/utils/with_user_tracking'

export default class Patient extends compose(
  BaseModel,
  withUUID(),
  withTimestamps(),
  withUserTracking()
) {
  @column()
  declare userId: string

  @column()
  declare fullName: string

  @column()
  declare birthDate: DateTime

  @column()
  declare cpf: string

  @column()
  declare phone: string

  @column()
  declare address: string

  @column()
  declare city: string

  @column()
  declare state: string

  @column()
  declare zipCode: string

  @column()
  declare email: string

  @column()
  declare active: boolean
}

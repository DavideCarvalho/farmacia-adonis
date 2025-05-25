import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import { withUUID } from '#models/utils/with_uuid'
import { withTimestamps } from '#models/utils/with_timestamps'
import { withUserTracking } from '#models/utils/with_user_tracking'
import { compose } from '@adonisjs/core/helpers'

export default class Prescription extends compose(
  BaseModel,
  withUUID(),
  withTimestamps(),
  withUserTracking()
) {
  @column()
  declare patientId: string

  @column()
  declare doctorId: string

  @column()
  declare diagnosis: string

  @column()
  declare medications: string

  @column()
  declare status: 'pending' | 'approved' | 'rejected'

  @column()
  declare pharmacistNotes: string | null

  @belongsTo(() => User, {
    foreignKey: 'doctorId',
  })
  declare doctor: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'patientId',
  })
  declare patient: BelongsTo<typeof User>
}

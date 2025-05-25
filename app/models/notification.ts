import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Prescription from '#models/prescription'
import { withUUID } from '#models/utils/with_uuid'
import { withTimestamps } from '#models/utils/with_timestamps'
import { withUserTracking } from '#models/utils/with_user_tracking'
import { compose } from '@adonisjs/core/helpers'

export default class Notification extends compose(
  BaseModel,
  withUUID(),
  withTimestamps(),
  withUserTracking()
) {
  @column()
  declare pharmacistId: string

  @column()
  declare prescriptionId: string

  @column()
  declare type: 'prescription_review'

  @column()
  declare status: 'unread' | 'read'

  @column()
  declare userId: string

  @belongsTo(() => User, {
    foreignKey: 'pharmacistId',
  })
  declare pharmacist: BelongsTo<typeof User>

  @belongsTo(() => Prescription, {
    foreignKey: 'prescriptionId',
  })
  declare prescription: BelongsTo<typeof Prescription>
}

import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import MedicationRequest from '#models/medication_request'
import Medication from '#models/medication'
import { withUUID } from '#models/utils/with_uuid'
import { withTimestamps } from '#models/utils/with_timestamps'
import { withUserTracking } from '#models/utils/with_user_tracking'
import { compose } from '@adonisjs/core/helpers'

export default class MedicationRequestItem extends compose(
  BaseModel,
  withUUID(),
  withTimestamps(),
  withUserTracking()
) {
  @column()
  declare medicationRequestId: string

  @column()
  declare medicationId: string

  @column()
  declare quantity: number

  @column()
  declare notes: string | null

  @belongsTo(() => MedicationRequest)
  declare request: BelongsTo<typeof MedicationRequest>

  @belongsTo(() => Medication)
  declare medication: BelongsTo<typeof Medication>
}

import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import MedicationRequest from '#models/medication_request'
import Medication from '#models/medication'
import BaseUUIDModel from '#models/utils/base_uuid_model'

export default class MedicationRequestItem extends BaseUUIDModel {
  @column()
  declare requestId: string

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

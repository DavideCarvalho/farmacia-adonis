import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import MedicationRequest from './medication_request.js'
import Medication from './medication.js'
import BaseUUIDModel from './utils/base_uuid_model.js'

export default class MedicationRequestItem extends BaseUUIDModel {
  @column()
  public requestId!: string

  @column()
  public medicationId!: string

  @column()
  public quantity!: number

  @column()
  public notes!: string | null

  @belongsTo(() => MedicationRequest)
  public request!: BelongsTo<typeof MedicationRequest>

  @belongsTo(() => Medication)
  public medication!: BelongsTo<typeof Medication>
}

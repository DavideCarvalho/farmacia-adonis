import { BaseModelDto } from '@adocasts.com/dto/base'
import type MedicationRequestItem from '#models/medication_request_item'
import MedicationRequestDto from '#dtos/medication_request'
import MedicationDto from '#dtos/medication'

export default class MedicationRequestItemDto extends BaseModelDto {
  declare medicationRequestId: string
  declare medicationId: string
  declare quantity: number
  declare notes: string | null
  declare request: MedicationRequestDto | null
  declare medication: MedicationDto | null

  constructor(medicationRequestItem?: MedicationRequestItem) {
    super()

    if (!medicationRequestItem) return
    this.medicationRequestId = medicationRequestItem.medicationRequestId
    this.medicationId = medicationRequestItem.medicationId
    this.quantity = medicationRequestItem.quantity
    this.notes = medicationRequestItem.notes
    this.request =
      medicationRequestItem.request &&
      new MedicationRequestDto(medicationRequestItem.request)
    this.medication =
      medicationRequestItem.medication &&
      new MedicationDto(medicationRequestItem.medication)
  }
}

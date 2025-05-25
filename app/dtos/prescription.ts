import { BaseModelDto } from '@adocasts.com/dto/base'
import type Prescription from '#models/prescription'
import UserDto from '#dtos/user'

export default class PrescriptionDto extends BaseModelDto {
  declare id: string
  declare diagnosis: string
  declare medications: string
  declare status: 'pending' | 'approved' | 'rejected'
  declare pharmacistNotes: string | null
  declare createdAt: Date
  declare updatedAt: Date
  declare doctor: UserDto | null
  declare patient: UserDto | null

  constructor(prescription?: Prescription) {
    super()

    if (!prescription) return
    this.id = prescription.id
    this.diagnosis = prescription.diagnosis
    this.medications = prescription.medications
    this.status = prescription.status
    this.pharmacistNotes = prescription.pharmacistNotes
    this.createdAt = prescription.createdAt.toJSDate()
    this.updatedAt = prescription.updatedAt.toJSDate()
    this.doctor = prescription.doctor && new UserDto(prescription.doctor)
    this.patient = prescription.patient && new UserDto(prescription.patient)
  }
}

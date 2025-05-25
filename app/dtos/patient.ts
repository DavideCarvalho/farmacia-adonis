import { BaseModelDto } from '@adocasts.com/dto/base'
import type Patient from '#models/patient'

export default class PatientDto extends BaseModelDto {
  declare id: string
  declare userId: string
  declare fullName: string
  declare birthDate: Date
  declare cpf: string
  declare phone: string
  declare address: string
  declare city: string
  declare state: string
  declare zipCode: string
  declare email: string
  declare active: boolean
  declare createdAt: Date
  declare updatedAt: Date

  constructor(patient?: Patient) {
    super()

    if (!patient) return

    this.id = patient.id
    this.userId = patient.userId
    this.fullName = patient.fullName
    this.birthDate = patient.birthDate.toJSDate()
    this.cpf = patient.cpf
    this.phone = patient.phone
    this.address = patient.address
    this.city = patient.city
    this.state = patient.state
    this.zipCode = patient.zipCode
    this.email = patient.email
    this.active = patient.active
    this.createdAt = patient.createdAt.toJSDate()
    this.updatedAt = patient.updatedAt.toJSDate()
  }
}

import { BaseModelDto } from '@adocasts.com/dto/base'
import Department from '#models/department'
import UserDto from '#dtos/user'
import MedicationRequestDto from '#dtos/medication_request'
import DispensationDto from '#dtos/dispensation'

export default class DepartmentDto extends BaseModelDto {
  declare name: string
  declare description: string | null
  declare users: UserDto[]
  declare requests: MedicationRequestDto[]
  declare dispensations: DispensationDto[]

  constructor(department?: Department) {
    super()

    if (!department) return
    this.name = department.name
    this.description = department.description
    this.users = UserDto.fromArray(department.users)
    this.requests = MedicationRequestDto.fromArray(department.requests)
    this.dispensations = DispensationDto.fromArray(department.dispensations)
  }
}

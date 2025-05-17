import { BaseModelDto } from '@adocasts.com/dto/base'
import MedicationRequest from '#models/medication_request'
import DepartmentDto from '#dtos/department'
import UserDto from '#dtos/user'
import MedicationRequestItemDto from '#dtos/medication_request_item'
import DispensationDto from '#dtos/dispensation'

export default class MedicationRequestDto extends BaseModelDto {
  declare departmentId!: string
  declare requestedById!: string
  declare approvedById!: string | null
  declare status!: RequestStatus
  declare priority!: RequestPriority
  declare rejectionReason!: string | null
  declare department!: DepartmentDto | null
  declare requestedBy!: UserDto | null
  declare approvedBy!: UserDto | null
  declare items!: MedicationRequestItemDto[]
  declare dispensation!: DispensationDto | null

  constructor(medicationRequest?: MedicationRequest) {
    super()

    if (!medicationRequest) return
    this.departmentId! = medicationRequest.departmentId!
    this.requestedById! = medicationRequest.requestedById!
    this.approvedById! = medicationRequest.approvedById!
    this.status! = medicationRequest.status!
    this.priority! = medicationRequest.priority!
    this.rejectionReason! = medicationRequest.rejectionReason!
    this.department! = medicationRequest.department! && new DepartmentDto(medicationRequest.department!)
    this.requestedBy! = medicationRequest.requestedBy! && new UserDto(medicationRequest.requestedBy!)
    this.approvedBy! = medicationRequest.approvedBy! && new UserDto(medicationRequest.approvedBy!)
    this.items! = MedicationRequestItemDto.fromArray(medicationRequest.items!)
    this.dispensation! = medicationRequest.dispensation! && new DispensationDto(medicationRequest.dispensation!)
  }
}
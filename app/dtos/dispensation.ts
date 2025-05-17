import { BaseModelDto } from '@adocasts.com/dto/base'
import Dispensation from '#models/dispensation'
import DepartmentDto from '#dtos/department'
import MedicationRequestDto from '#dtos/medication_request'
import UserDto from '#dtos/user'
import DispensationItemDto from '#dtos/dispensation_item'
import StockMovementDto from '#dtos/stock_movement'

export default class DispensationDto extends BaseModelDto {
  declare departmentId: string
  declare requestId: string | null
  declare dispensedById: string
  declare department: DepartmentDto | null
  declare request: MedicationRequestDto | null
  declare dispensedBy: UserDto | null
  declare items: DispensationItemDto[]
  declare stockMovements: StockMovementDto[]

  constructor(dispensation?: Dispensation) {
    super()

    if (!dispensation) return
    this.departmentId! = dispensation.departmentId!
    this.requestId! = dispensation.requestId!
    this.dispensedById! = dispensation.dispensedById!
    this.department! = dispensation.department! && new DepartmentDto(dispensation.department!)
    this.request! = dispensation.request! && new MedicationRequestDto(dispensation.request!)
    this.dispensedBy! = dispensation.dispensedBy! && new UserDto(dispensation.dispensedBy!)
    this.items! = DispensationItemDto.fromArray(dispensation.items!)
    this.stockMovements! = StockMovementDto.fromArray(dispensation.stockMovements!)
  }
}

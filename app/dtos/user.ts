import { BaseModelDto } from '@adocasts.com/dto/base'
import User from '#models/user'
import DepartmentDto from '#dtos/department'
import ActivityDto from '#dtos/activity'
import MedicationRequestDto from '#dtos/medication_request'
import DispensationDto from '#dtos/dispensation'
import StockMovementDto from '#dtos/stock_movement'

export default class UserDto extends BaseModelDto {
  declare id: string
  declare fullName: string | null
  declare email: string
  declare password: string
  declare role: UserRole
  declare departmentId: string | null
  declare createdAt: string
  declare updatedAt: string | null
  declare createdBy: UserDto | null
  declare updatedBy: UserDto | null
  declare department: DepartmentDto | null
  declare activities: ActivityDto[]
  declare requests: MedicationRequestDto[]
  declare approvedRequests: MedicationRequestDto[]
  declare dispensations: DispensationDto[]
  declare stockMovements: StockMovementDto[]
  declare static beforeCreatemodel: User

  constructor(user?: User) {
    super()

    if (!user) return
    this.id = user.id
    this.fullName = user.fullName
    this.email = user.email
    this.password = user.password
    this.role = user.role
    this.departmentId = user.departmentId
    this.createdAt = user.createdAt.toISO()!
    this.updatedAt = user.updatedAt?.toISO()!
    this.createdBy = user.createdBy && new UserDto(user.createdBy)
    this.updatedBy = user.updatedBy && new UserDto(user.updatedBy)
    this.department = user.department && new DepartmentDto(user.department)
    this.activities = ActivityDto.fromArray(user.activities)
    this.requests = MedicationRequestDto.fromArray(user.requests)
    this.approvedRequests = MedicationRequestDto.fromArray(user.approvedRequests)
    this.dispensations = DispensationDto.fromArray(user.dispensations)
    this.stockMovements = StockMovementDto.fromArray(user.stockMovements)
    this.static beforeCreatemodel = user.static beforeCreatemodel
  }
}
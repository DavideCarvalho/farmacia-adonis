import { BaseModelDto } from '@adocasts.com/dto/base'
import BaseUuid from '#models/base_uuid'
import UserDto from '#dtos/user'

export default class BaseUuidDto extends BaseModelDto {
  declare static selfAssignPrimaryKey = true: string
  declare id: string
  declare createdById: string
  declare updatedById: string
  declare createdAt: string
  declare updatedAt: string
  declare createdBy: UserDto | null
  declare updatedBy: UserDto | null
  declare static beforeCreatemodel: BaseUUIDModel

  constructor(baseUuid?: BaseUuid) {
    super()

    if (!baseUuid) return
    this.static selfAssignPrimaryKey = true = baseUuid.static selfAssignPrimaryKey = true
    this.id = baseUuid.id
    this.createdById = baseUuid.createdById
    this.updatedById = baseUuid.updatedById
    this.createdAt = baseUuid.createdAt.toISO()!
    this.updatedAt = baseUuid.updatedAt.toISO()!
    this.createdBy = baseUuid.createdBy && new UserDto(baseUuid.createdBy)
    this.updatedBy = baseUuid.updatedBy && new UserDto(baseUuid.updatedBy)
    this.static beforeCreatemodel = baseUuid.static beforeCreatemodel
  }
}
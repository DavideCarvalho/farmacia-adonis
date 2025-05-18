import { BaseModelDto } from '@adocasts.com/dto/base'
import Activity from '#models/activity'
import UserDto from '#dtos/user'

export default class ActivityDto extends BaseModelDto {
  declare userId!: string
  declare type!: ActivityType
  declare description!: string
  declare metadata!: Record<string, unknown> | null
  declare user!: UserDto | null

  constructor(activity?: Activity) {
    super()

    if (!activity) return
    this.userId! = activity.userId!
    this.type! = activity.type!
    this.description! = activity.description!
    this.metadata! = activity.metadata!
    this.user! = activity.user! && new UserDto(activity.user!)
  }
}

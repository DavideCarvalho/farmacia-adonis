import { BaseModelDto } from '@adocasts.com/dto/base'
import type Notification from '#models/notification'
import UserDto from '#dtos/user'
import PrescriptionDto from '#dtos/prescription'

export default class NotificationDto extends BaseModelDto {
  declare pharmacist: UserDto | null
  declare prescription: PrescriptionDto | null

  constructor(notification?: Notification) {
    super()

    if (!notification) return
    this.pharmacist = notification.pharmacist && new UserDto(notification.pharmacist)
    this.prescription = notification.prescription && new PrescriptionDto(notification.prescription)
  }
}

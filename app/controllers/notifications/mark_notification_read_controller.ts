import type { HttpContext } from '@adonisjs/core/http'
import Notification from '#models/notification'
import NotificationDto from '#dtos/notification'

export default class MarkNotificationReadController {
  async handle({ response, params, auth }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized({ message: 'User not authenticated' })
    }

    const notification = await Notification.findOrFail(params.id)

    if (notification.pharmacistId !== auth.user.id) {
      return response.forbidden({ message: 'Not authorized to update this notification' })
    }

    notification.status = 'read'
    await notification.save()

    return new NotificationDto(notification)
  }
}

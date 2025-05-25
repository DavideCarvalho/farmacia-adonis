import type { HttpContext } from '@adonisjs/core/http'
import Notification from '#models/notification'
import NotificationDto from '#dtos/notification'

export default class ListNotificationsController {
  async handle({ response, auth }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized({ message: 'User not authenticated' })
    }

    const notifications = await Notification.query()
      .where('pharmacist_id', auth.user.id)
      .where('status', 'unread')
      .preload('prescription', (query) => {
        query.preload('patient')
        query.preload('doctor')
      })
      .orderBy('created_at', 'desc')

    return NotificationDto.fromArray(notifications)
  }
}

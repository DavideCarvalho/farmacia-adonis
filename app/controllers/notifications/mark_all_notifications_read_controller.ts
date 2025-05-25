import type { HttpContext } from '@adonisjs/core/http'
import Notification from '#models/notification'

export default class MarkAllNotificationsReadController {
  async handle({ response, auth }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized({ message: 'User not authenticated' })
    }

    await Notification.query()
      .where('pharmacist_id', auth.user.id)
      .where('status', 'unread')
      .update({ status: 'read' })

    return response.noContent()
  }
}

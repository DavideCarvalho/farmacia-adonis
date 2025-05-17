import { HttpContext } from '@adonisjs/core/http'
import Activity from '#models/activity'

export default class RecentActivityController {
  async handle({ response }: HttpContext) {
    const activities = await Activity.query()
      .preload('user', (query) => {
        query.preload('department')
      })
      .orderBy('createdAt', 'desc')
      .limit(10)

    return response.json({
      activities: activities.map((activity) => ({
        id: activity.id,
        type: activity.type,
        description: activity.description,
        user: activity.user.fullName,
        department: activity.user.department?.name || 'Sistema',
        createdAt: activity.createdAt,
      })),
    })
  }
}

import factory from '@adonisjs/lucid/factories'
import Notification from '#models/notification'

export const NotificationFactory = factory
  .define(Notification, async ({ faker }) => {
    return {
      type: 'prescription_review' as const,
      status: faker.helpers.arrayElement(['unread', 'read'] as const),
    }
  })
  .build()

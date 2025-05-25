import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const ListNotificationsController = () =>
  import('#controllers/notifications/list_notifications_controller')
const MarkNotificationReadController = () =>
  import('#controllers/notifications/mark_notification_read_controller')
const MarkAllNotificationsReadController = () =>
  import('#controllers/notifications/mark_all_notifications_read_controller')

router
  .group(() => {
    router.get('/', [ListNotificationsController]).as('list')
    router.post('/:id/mark-as-read', [MarkNotificationReadController]).as('markAsRead')
    router.post('/mark-all-as-read', [MarkAllNotificationsReadController]).as('markAllAsRead')
  })
  .prefix('/api/notifications')
  .as('api.dashboard')
// .use(middleware.auth())

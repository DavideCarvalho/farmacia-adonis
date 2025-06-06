// @ts-nocheck
/* eslint-disable */
// --------------------------------------------------
// This file is auto-generated by Tuyau. Do not edit manually !
// --------------------------------------------------

import type { MakeTuyauRequest, MakeNonSerializedTuyauResponse } from '@tuyau/utils/types'
import type { InferInput } from '@vinejs/vine/types'

type ApiDashboardStatsGetHead = {
  request: unknown
  response: MakeNonSerializedTuyauResponse<import('../app/controllers/dashboard/stats_controller.ts').default['handle'], false>
}
type ApiDashboardStockchartGetHead = {
  request: unknown
  response: MakeNonSerializedTuyauResponse<import('../app/controllers/dashboard/stock_chart_controller.ts').default['handle'], false>
}
type ApiDashboardMedicationalertsGetHead = {
  request: unknown
  response: MakeNonSerializedTuyauResponse<import('../app/controllers/dashboard/medication_alerts_controller.ts').default['handle'], false>
}
type ApiDashboardMedicationrequestsGetHead = {
  request: unknown
  response: MakeNonSerializedTuyauResponse<import('../app/controllers/dashboard/medication_requests_controller.ts').default['handle'], false>
}
type ApiDashboardTopmedicationsGetHead = {
  request: unknown
  response: MakeNonSerializedTuyauResponse<import('../app/controllers/dashboard/top_medications_controller.ts').default['handle'], false>
}
type ApiDashboardRecentactivityGetHead = {
  request: unknown
  response: MakeNonSerializedTuyauResponse<import('../app/controllers/dashboard/recent_activity_controller.ts').default['handle'], false>
}
type ApiPrescriptionsGetHead = {
  request: unknown
  response: MakeNonSerializedTuyauResponse<import('../app/controllers/prescriptions/list_prescriptions_controller.ts').default['handle'], false>
}
type ApiPrescriptionsPost = {
  request: unknown
  response: MakeNonSerializedTuyauResponse<import('../app/controllers/prescriptions/create_prescription_controller.ts').default['handle'], false>
}
type ApiPrescriptionsIdGetHead = {
  request: unknown
  response: MakeNonSerializedTuyauResponse<import('../app/controllers/prescriptions/show_prescription_controller.ts').default['handle'], false>
}
type ApiPrescriptionsIdReviewPost = {
  request: unknown
  response: MakeNonSerializedTuyauResponse<import('../app/controllers/prescriptions/review_prescription_controller.ts').default['handle'], false>
}
type ApiNotificationsGetHead = {
  request: unknown
  response: MakeNonSerializedTuyauResponse<import('../app/controllers/notifications/list_notifications_controller.ts').default['handle'], false>
}
type ApiNotificationsIdMarkasreadPost = {
  request: unknown
  response: MakeNonSerializedTuyauResponse<import('../app/controllers/notifications/mark_notification_read_controller.ts').default['handle'], false>
}
type ApiNotificationsMarkallasreadPost = {
  request: unknown
  response: MakeNonSerializedTuyauResponse<import('../app/controllers/notifications/mark_all_notifications_read_controller.ts').default['handle'], false>
}
type ApiPatientsGetHead = {
  request: unknown
  response: MakeNonSerializedTuyauResponse<import('../app/controllers/patients/list_patients_controller.ts').default['handle'], false>
}
export interface ApiDefinition {
  'api': {
    'dashboard': {
      'stats': {
        '$url': {
        };
        '$get': ApiDashboardStatsGetHead;
        '$head': ApiDashboardStatsGetHead;
      };
      'stock-chart': {
        '$url': {
        };
        '$get': ApiDashboardStockchartGetHead;
        '$head': ApiDashboardStockchartGetHead;
      };
      'medication-alerts': {
        '$url': {
        };
        '$get': ApiDashboardMedicationalertsGetHead;
        '$head': ApiDashboardMedicationalertsGetHead;
      };
      'medication-requests': {
        '$url': {
        };
        '$get': ApiDashboardMedicationrequestsGetHead;
        '$head': ApiDashboardMedicationrequestsGetHead;
      };
      'top-medications': {
        '$url': {
        };
        '$get': ApiDashboardTopmedicationsGetHead;
        '$head': ApiDashboardTopmedicationsGetHead;
      };
      'recent-activity': {
        '$url': {
        };
        '$get': ApiDashboardRecentactivityGetHead;
        '$head': ApiDashboardRecentactivityGetHead;
      };
    };
    'prescriptions': {
      '$url': {
      };
      '$get': ApiPrescriptionsGetHead;
      '$head': ApiPrescriptionsGetHead;
      '$post': ApiPrescriptionsPost;
      ':id': {
        '$url': {
        };
        '$get': ApiPrescriptionsIdGetHead;
        '$head': ApiPrescriptionsIdGetHead;
        'review': {
          '$url': {
          };
          '$post': ApiPrescriptionsIdReviewPost;
        };
      };
    };
    'notifications': {
      '$url': {
      };
      '$get': ApiNotificationsGetHead;
      '$head': ApiNotificationsGetHead;
      ':id': {
        'mark-as-read': {
          '$url': {
          };
          '$post': ApiNotificationsIdMarkasreadPost;
        };
      };
      'mark-all-as-read': {
        '$url': {
        };
        '$post': ApiNotificationsMarkallasreadPost;
      };
    };
    'patients': {
      '$url': {
      };
      '$get': ApiPatientsGetHead;
      '$head': ApiPatientsGetHead;
    };
  };
}
const routes = [
  {
    params: [],
    name: 'web.home',
    path: '/',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
  {
    params: [],
    name: 'web.login',
    path: '/login',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
  {
    params: [],
    name: 'web.forgotPassword',
    path: '/esqueci-minha-senha',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
  {
    params: [],
    name: 'web.dashboard',
    path: '/dashboard',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
  {
    params: [],
    name: 'web.prescriptions',
    path: '/prescricoes',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
  {
    params: [],
    name: 'web.notifications',
    path: '/notificacoes',
    method: ["GET","HEAD"],
    types: {} as unknown,
  },
  {
    params: [],
    name: 'api.dashboard.stats',
    path: '/api/dashboard/stats',
    method: ["GET","HEAD"],
    types: {} as ApiDashboardStatsGetHead,
  },
  {
    params: [],
    name: 'api.dashboard.stockChart',
    path: '/api/dashboard/stock-chart',
    method: ["GET","HEAD"],
    types: {} as ApiDashboardStockchartGetHead,
  },
  {
    params: [],
    name: 'api.dashboard.medicationAlerts',
    path: '/api/dashboard/medication-alerts',
    method: ["GET","HEAD"],
    types: {} as ApiDashboardMedicationalertsGetHead,
  },
  {
    params: [],
    name: 'api.dashboard.medicationRequests',
    path: '/api/dashboard/medication-requests',
    method: ["GET","HEAD"],
    types: {} as ApiDashboardMedicationrequestsGetHead,
  },
  {
    params: [],
    name: 'api.dashboard.topMedications',
    path: '/api/dashboard/top-medications',
    method: ["GET","HEAD"],
    types: {} as ApiDashboardTopmedicationsGetHead,
  },
  {
    params: [],
    name: 'api.dashboard.recentActivity',
    path: '/api/dashboard/recent-activity',
    method: ["GET","HEAD"],
    types: {} as ApiDashboardRecentactivityGetHead,
  },
  {
    params: [],
    name: 'api.prescriptions.list',
    path: '/api/prescriptions',
    method: ["GET","HEAD"],
    types: {} as ApiPrescriptionsGetHead,
  },
  {
    params: [],
    name: 'api.prescriptions.create',
    path: '/api/prescriptions',
    method: ["POST"],
    types: {} as ApiPrescriptionsPost,
  },
  {
    params: ["id"],
    name: 'api.prescriptions.show',
    path: '/api/prescriptions/:id',
    method: ["GET","HEAD"],
    types: {} as ApiPrescriptionsIdGetHead,
  },
  {
    params: ["id"],
    name: 'api.prescriptions.review',
    path: '/api/prescriptions/:id/review',
    method: ["POST"],
    types: {} as ApiPrescriptionsIdReviewPost,
  },
  {
    params: [],
    name: 'api.dashboard.list',
    path: '/api/notifications',
    method: ["GET","HEAD"],
    types: {} as ApiNotificationsGetHead,
  },
  {
    params: ["id"],
    name: 'api.dashboard.markAsRead',
    path: '/api/notifications/:id/mark-as-read',
    method: ["POST"],
    types: {} as ApiNotificationsIdMarkasreadPost,
  },
  {
    params: [],
    name: 'api.dashboard.markAllAsRead',
    path: '/api/notifications/mark-all-as-read',
    method: ["POST"],
    types: {} as ApiNotificationsMarkallasreadPost,
  },
  {
    params: [],
    name: 'api.patients.list',
    path: '/api/patients',
    method: ["GET","HEAD"],
    types: {} as ApiPatientsGetHead,
  },
] as const;
export const api = {
  routes,
  definition: {} as ApiDefinition
}

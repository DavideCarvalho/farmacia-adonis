/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~/utils/query_client'
import { Toaster } from 'react-hot-toast'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    hydrateRoot(
      el,
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <App {...props} />
      </QueryClientProvider>
    )
  },
})

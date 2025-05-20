/// <reference path="../../../adonisrc.ts" />
import { createTuyau } from '@tuyau/client'
import { api } from '../../../.adonisjs/api'
import { superjson } from '@tuyau/superjson/plugin'

export const tuyau = createTuyau({
  api,
  baseUrl: 'http://localhost:3333',
  plugins: [superjson()],
})

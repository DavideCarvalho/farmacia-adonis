import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import BaseUUIDModel from '#models/utils/base_uuid_model'

export enum ActivityType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  DISPENSE = 'DISPENSE',
  STOCK_MOVEMENT = 'STOCK_MOVEMENT',
  SYSTEM = 'SYSTEM',
}

export default class Activity extends BaseUUIDModel {
  @column()
  declare userId: string

  @column()
  declare type: ActivityType

  @column()
  declare description: string

  @column()
  declare metadata: Record<string, unknown> | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}

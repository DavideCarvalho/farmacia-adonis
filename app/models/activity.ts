import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import BaseUUIDModel from './utils/base_uuid_model.js'

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
  public userId!: string

  @column()
  public type!: ActivityType

  @column()
  public description!: string

  @column()
  public metadata!: Record<string, unknown> | null

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>
}

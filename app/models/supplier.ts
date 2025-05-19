import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Batch from '#models/batch'
import { v7 } from 'uuid'
import type { DateTime } from 'luxon'
import User from '#models/user'

/*
 * If Supplier extends from BaseUUIDModel, we get "Cannot access 'BaseUUIDModel' before initialization"error.
 * We don't know why and how to fix it.
 * So we're using BaseModel instead and basically copying the BaseUUIDModel code.
 */
export default class Supplier extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare cnpj: string

  @column()
  declare email: string | null

  @column()
  declare phone: string | null

  @column()
  declare address: string | null

  @column()
  declare contact: string | null

  @hasMany(() => Batch)
  declare batches: HasMany<typeof Batch>

  @column()
  declare createdById: string

  @column()
  declare updatedById: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare createdBy: BelongsTo<typeof User>

  @belongsTo(() => User)
  declare updatedBy: BelongsTo<typeof User>

  @beforeCreate()
  public static beforeCreate(model: Supplier) {
    model.id = v7()
  }
}

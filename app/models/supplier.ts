import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Batch from '#models/batch'
import BaseUUIDModel from '#models/utils/base_uuid_model'

export default class Supplier extends BaseModel {
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
}

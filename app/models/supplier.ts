import { column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Batch from './batch.js'
import BaseUUIDModel from './utils/base_uuid_model.js'

export default class Supplier extends BaseUUIDModel {
  @column()
  public name!: string

  @column()
  public cnpj!: string

  @column()
  public email!: string | null

  @column()
  public phone!: string | null

  @column()
  public address!: string | null

  @column()
  public contact!: string | null

  @hasMany(() => Batch)
  public batches!: HasMany<typeof Batch>
}

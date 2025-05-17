import type { DateTime } from 'luxon'
import { column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Batch from './batch.js'
import StockItem from './stock_item.js'
import DispensationItem from './dispensation_item.js'
import MedicationRequestItem from './medication_request_item.js'
import BaseUUIDModel from './utils/base_uuid_model.js'

export enum MedicationForm {
  TABLET = 'TABLET',
  CAPSULE = 'CAPSULE',
  LIQUID = 'LIQUID',
  INJECTION = 'INJECTION',
  CREAM = 'CREAM',
  OINTMENT = 'OINTMENT',
  POWDER = 'POWDER',
  SPRAY = 'SPRAY',
  OTHER = 'OTHER',
}

export default class Medication extends BaseUUIDModel {
  @column()
  public name!: string

  @column()
  public genericName!: string | null

  @column()
  public description!: string | null

  @column()
  public dosage!: string

  @column()
  public form!: MedicationForm

  @column()
  public category!: string | null

  @column()
  public minStock!: number

  @column()
  public maxStock!: number | null

  @column()
  public controlled!: boolean

  @column()
  public refrigerated!: boolean

  @column()
  public barcode!: string | null

  @hasMany(() => Batch)
  public batches!: HasMany<typeof Batch>

  @hasMany(() => StockItem)
  public stockItems!: HasMany<typeof StockItem>

  @hasMany(() => DispensationItem)
  public dispensationItems!: HasMany<typeof DispensationItem>

  @hasMany(() => MedicationRequestItem)
  public requestItems!: HasMany<typeof MedicationRequestItem>
}

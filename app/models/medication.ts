import { column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Batch from '#models/batch'
import StockItem from '#models/stock_item'
import DispensationItem from '#models/dispensation_item'
import MedicationRequestItem from '#models/medication_request_item'
import BaseUUIDModel from '#models/utils/base_uuid_model'

export enum MedicationForm {
  COMPRIMIDO = 'COMPRIMIDO',
  CAPSULA = 'CAPSULA',
  LIQUIDO = 'LIQUIDO',
  INJETAVEL = 'INJETAVEL',
  POMADA = 'POMADA',
  CREME = 'CREME',
  GEL = 'GEL',
  AEROSOL = 'AEROSOL',
  ADESIVO = 'ADESIVO',
  OUTRO = 'OUTRO',
}

export default class Medication extends BaseUUIDModel {
  @column()
  declare name: string

  @column()
  declare genericName: string | null

  @column()
  declare description: string | null

  @column()
  declare dosage: string

  @column()
  declare form: MedicationForm

  @column()
  declare category: string | null

  @column()
  declare minStock: number

  @column()
  declare maxStock: number | null

  @column()
  declare controlled: boolean

  @column()
  declare refrigerated: boolean

  @column()
  declare barcode: string | null

  @hasMany(() => Batch)
  declare batches: HasMany<typeof Batch>

  @hasMany(() => StockItem)
  declare stockItems: HasMany<typeof StockItem>

  @hasMany(() => DispensationItem)
  declare dispensationItems: HasMany<typeof DispensationItem>

  @hasMany(() => MedicationRequestItem)
  declare requestItems: HasMany<typeof MedicationRequestItem>
}

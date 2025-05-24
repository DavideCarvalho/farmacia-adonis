import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Department from '#models/department'
import Batch from '#models/batch'
import StockItem from '#models/stock_item'
import DispensationItem from '#models/dispensation_item'
import MedicationRequestItem from '#models/medication_request_item'
import { withUUID } from '#models/utils/with_uuid'
import { withTimestamps } from '#models/utils/with_timestamps'
import { withUserTracking } from '#models/utils/with_user_tracking'
import { compose } from '@adonisjs/core/helpers'

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

export default class Medication extends compose(
  BaseModel,
  withUUID(),
  withTimestamps(),
  withUserTracking()
) {
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

import { BaseModelDto } from '@adocasts.com/dto/base'
import Batch from '#models/batch'
import MedicationDto from '#dtos/medication'
import SupplierDto from '#dtos/supplier'
import StockItemDto from '#dtos/stock_item'

export default class BatchDto extends BaseModelDto {
  declare number!: string
  declare medicationId!: string
  declare supplierId!: string
  declare manufacturingDate!: string | null
  declare expirationDate!: string
  declare quantity!: number
  declare purchasePrice!: number
  declare medication!: MedicationDto | null
  declare supplier!: SupplierDto | null
  declare stockItems!: StockItemDto[]

  constructor(batch?: Batch) {
    super()

    if (!batch) return
    this.number! = batch.number!
    this.medicationId! = batch.medicationId!
    this.supplierId! = batch.supplierId!
    this.manufacturingDate! = batch.manufacturingDate!?.toISO()!
    this.expirationDate! = batch.expirationDate!.toISO()!
    this.quantity! = batch.quantity!
    this.purchasePrice! = batch.purchasePrice!
    this.medication! = batch.medication! && new MedicationDto(batch.medication!)
    this.supplier! = batch.supplier! && new SupplierDto(batch.supplier!)
    this.stockItems! = StockItemDto.fromArray(batch.stockItems!)
  }
}
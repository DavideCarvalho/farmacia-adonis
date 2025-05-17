import { BaseModelDto } from '@adocasts.com/dto/base'
import StockItem from '#models/stock_item'
import MedicationDto from '#dtos/medication'
import BatchDto from '#dtos/batch'
import StockMovementDto from '#dtos/stock_movement'
import DispensationItemDto from '#dtos/dispensation_item'

export default class StockItemDto extends BaseModelDto {
  declare medicationId!: string
  declare batchId!: string
  declare currentQuantity!: number
  declare location!: string | null
  declare medication!: MedicationDto | null
  declare batch!: BatchDto | null
  declare stockMovements!: StockMovementDto[]
  declare dispensationItems!: DispensationItemDto[]

  constructor(stockItem?: StockItem) {
    super()

    if (!stockItem) return
    this.medicationId! = stockItem.medicationId!
    this.batchId! = stockItem.batchId!
    this.currentQuantity! = stockItem.currentQuantity!
    this.location! = stockItem.location!
    this.medication! = stockItem.medication! && new MedicationDto(stockItem.medication!)
    this.batch! = stockItem.batch! && new BatchDto(stockItem.batch!)
    this.stockMovements! = StockMovementDto.fromArray(stockItem.stockMovements!)
    this.dispensationItems! = DispensationItemDto.fromArray(stockItem.dispensationItems!)
  }
}
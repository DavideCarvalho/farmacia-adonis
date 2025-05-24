import { BaseModelDto } from '@adocasts.com/dto/base'
import type StockItem from '#models/stock_item'
import MedicationDto from '#dtos/medication'
import BatchDto from '#dtos/batch'
import StockMovementDto from '#dtos/stock_movement'
import DispensationItemDto from '#dtos/dispensation_item'

export default class StockItemDto extends BaseModelDto {
  declare medicationId: string
  declare batchId: string
  declare quantity: number
  declare location: string | null
  declare active: boolean
  declare medication: MedicationDto | null
  declare batch: BatchDto | null
  declare stockMovements: StockMovementDto[]
  declare dispensationItems: DispensationItemDto[]

  constructor(stockItem?: StockItem) {
    super()

    if (!stockItem) return
    this.medicationId = stockItem.medicationId
    this.batchId = stockItem.batchId
    this.quantity = stockItem.quantity
    this.location = stockItem.location
    this.active = stockItem.active
    this.medication = stockItem.medication && new MedicationDto(stockItem.medication)
    this.batch = stockItem.batch && new BatchDto(stockItem.batch)
    this.stockMovements = StockMovementDto.fromArray(stockItem.stockMovements)
    this.dispensationItems = DispensationItemDto.fromArray(stockItem.dispensationItems)
  }
}

import { BaseModelDto } from '@adocasts.com/dto/base'
import DispensationItem from '#models/dispensation_item'
import DispensationDto from '#dtos/dispensation'
import MedicationDto from '#dtos/medication'
import StockItemDto from '#dtos/stock_item'

export default class DispensationItemDto extends BaseModelDto {
  declare dispensationId!: string
  declare medicationId!: string
  declare stockItemId!: string
  declare quantity!: number
  declare dispensation!: DispensationDto | null
  declare medication!: MedicationDto | null
  declare stockItem!: StockItemDto | null

  constructor(dispensationItem?: DispensationItem) {
    super()

    if (!dispensationItem) return
    this.dispensationId! = dispensationItem.dispensationId!
    this.medicationId! = dispensationItem.medicationId!
    this.stockItemId! = dispensationItem.stockItemId!
    this.quantity! = dispensationItem.quantity!
    this.dispensation! = dispensationItem.dispensation! && new DispensationDto(dispensationItem.dispensation!)
    this.medication! = dispensationItem.medication! && new MedicationDto(dispensationItem.medication!)
    this.stockItem! = dispensationItem.stockItem! && new StockItemDto(dispensationItem.stockItem!)
  }
}
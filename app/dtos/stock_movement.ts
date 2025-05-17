import { BaseModelDto } from '@adocasts.com/dto/base'
import StockMovement from '#models/stock_movement'
import StockItemDto from '#dtos/stock_item'
import UserDto from '#dtos/user'
import DispensationDto from '#dtos/dispensation'

export default class StockMovementDto extends BaseModelDto {
  declare stockItemId!: string
  declare type!: MovementType
  declare quantity!: number
  declare reason!: string | null
  declare userId!: string
  declare dispensationId!: string | null
  declare stockItem!: StockItemDto | null
  declare user!: UserDto | null
  declare dispensation!: DispensationDto | null

  constructor(stockMovement?: StockMovement) {
    super()

    if (!stockMovement) return
    this.stockItemId! = stockMovement.stockItemId!
    this.type! = stockMovement.type!
    this.quantity! = stockMovement.quantity!
    this.reason! = stockMovement.reason!
    this.userId! = stockMovement.userId!
    this.dispensationId! = stockMovement.dispensationId!
    this.stockItem! = stockMovement.stockItem! && new StockItemDto(stockMovement.stockItem!)
    this.user! = stockMovement.user! && new UserDto(stockMovement.user!)
    this.dispensation! = stockMovement.dispensation! && new DispensationDto(stockMovement.dispensation!)
  }
}
import { BaseModelDto } from '@adocasts.com/dto/base'
import Medication, { MedicationForm } from '#models/medication'
import BatchDto from '#dtos/batch'
import StockItemDto from '#dtos/stock_item'
import DispensationItemDto from '#dtos/dispensation_item'
import MedicationRequestItemDto from '#dtos/medication_request_item'

export default class MedicationDto extends BaseModelDto {
  declare name: string
  declare genericName: string | null
  declare description: string | null
  declare dosage: string
  declare form: MedicationForm
  declare category: string | null
  declare minStock: number
  declare maxStock: number | null
  declare controlled: boolean
  declare refrigerated: boolean
  declare barcode: string | null
  declare batches: BatchDto[]
  declare stockItems: StockItemDto[]
  declare dispensationItems: DispensationItemDto[]
  declare requestItems: MedicationRequestItemDto[]

  constructor(medication?: Medication) {
    super()

    if (!medication) return
    this.name! = medication.name!
    this.genericName! = medication.genericName!
    this.description! = medication.description!
    this.dosage! = medication.dosage!
    this.form! = medication.form!
    this.category! = medication.category!
    this.minStock! = medication.minStock!
    this.maxStock! = medication.maxStock!
    this.controlled! = medication.controlled!
    this.refrigerated! = medication.refrigerated!
    this.barcode! = medication.barcode!
    this.batches! = BatchDto.fromArray(medication.batches!)
    this.stockItems! = StockItemDto.fromArray(medication.stockItems!)
    this.dispensationItems! = DispensationItemDto.fromArray(medication.dispensationItems!)
    this.requestItems! = MedicationRequestItemDto.fromArray(medication.requestItems!)
  }
}

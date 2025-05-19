import { BaseModelDto } from '@adocasts.com/dto/base'
import type Supplier from '#models/supplier'
import BatchDto from '#dtos/batch'

export default class SupplierDto extends BaseModelDto {
  declare name: string
  declare cnpj: string
  declare email: string | null
  declare phone: string | null
  declare address: string | null
  declare contact: string | null
  declare batches: BatchDto[]

  constructor(supplier?: Supplier) {
    super()

    if (!supplier) return
    this.name = supplier.name
    this.cnpj = supplier.cnpj
    this.email = supplier.email
    this.phone = supplier.phone
    this.address = supplier.address
    this.contact = supplier.contact
    this.batches = BatchDto.fromArray(supplier.batches)
  }
}

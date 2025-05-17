import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Supplier from '#models/supplier'
import { v7 } from 'uuid'

export default class extends BaseSeeder {
  async run() {
    const suppliers = [
      {
        id: v7(),
        name: 'Medicamentos SA',
        cnpj: '12345678000190',
        email: 'contato@medicamentossa.com.br',
        phone: '(11) 1234-5678',
        address: 'Av. Paulista, 1000 - São Paulo/SP',
        contact: 'João Silva',
      },
      {
        id: v7(),
        name: 'Farma Distribuidora',
        cnpj: '98765432000110',
        email: 'vendas@farmadistribuidora.com.br',
        phone: '(11) 9876-5432',
        address: 'Rua Augusta, 500 - São Paulo/SP',
        contact: 'Maria Santos',
      },
      {
        id: v7(),
        name: 'Medicamentos Express',
        cnpj: '45678901000123',
        email: 'atendimento@medicamentosexpress.com.br',
        phone: '(11) 4567-8901',
        address: 'Av. Rebouças, 2000 - São Paulo/SP',
        contact: 'Pedro Oliveira',
      },
    ]

    await Supplier.createMany(suppliers)
  }
}

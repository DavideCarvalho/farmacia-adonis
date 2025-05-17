import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User, { UserRole } from '#models/user'
import { v7 } from 'uuid'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run() {
    const adminPassword = await hash.make('admin123')
    const userPassword = await hash.make('user123')

    const users = [
      {
        id: v7(),
        fullName: 'Administrador',
        email: 'admin@hospital.com',
        password: adminPassword,
        role: UserRole.ADMIN,
        departmentId: null,
      },
      {
        id: v7(),
        fullName: 'João Farmacêutico',
        email: 'joao@hospital.com',
        password: userPassword,
        role: UserRole.PHARMACIST,
        departmentId: null,
      },
      {
        id: v7(),
        fullName: 'Maria Gerente',
        email: 'maria@hospital.com',
        password: userPassword,
        role: UserRole.PHARMACIST_MANAGER,
        departmentId: null,
      },
      {
        id: v7(),
        fullName: 'Pedro Técnico',
        email: 'pedro@hospital.com',
        password: userPassword,
        role: UserRole.TECHNICIAN,
        departmentId: null,
      },
      {
        id: v7(),
        fullName: 'Ana Enfermeira',
        email: 'ana@hospital.com',
        password: userPassword,
        role: UserRole.DEPARTMENT_USER,
        departmentId: null,
      },
    ]

    await User.createMany(users)
  }
}

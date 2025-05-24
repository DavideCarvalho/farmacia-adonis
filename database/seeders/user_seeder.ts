import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User, { UserRole } from '#models/user'
import Department from '#models/department'
import { v7 } from 'uuid'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run() {
    const adminPassword = await hash.make('admin123')
    const userPassword = await hash.make('user123')

    // Buscar departamentos
    const departments = await Department.all()
    if (departments.length === 0) {
      console.log('Nenhum departamento encontrado. Pulando seeder de usuários.')
      return
    }

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
        departmentId: departments.find(d => d.name === 'Farmácia Central')?.id || null,
      },
      {
        id: v7(),
        fullName: 'Maria Gerente',
        email: 'maria@hospital.com',
        password: userPassword,
        role: UserRole.PHARMACIST_MANAGER,
        departmentId: departments.find(d => d.name === 'Farmácia Central')?.id || null,
      },
      {
        id: v7(),
        fullName: 'Pedro Técnico',
        email: 'pedro@hospital.com',
        password: userPassword,
        role: UserRole.TECHNICIAN,
        departmentId: departments.find(d => d.name === 'Farmácia Central')?.id || null,
      },
    ]

    // Criar usuários de departamento
    for (const department of departments) {
      if (department.name === 'Farmácia Central') continue // Pular farmácia pois já tem usuários

      users.push({
        id: v7(),
        fullName: `Enfermeiro ${department.name}`,
        email: `enfermeiro.${department.name.toLowerCase().replace(/\s+/g, '.')}@hospital.com`,
        password: userPassword,
        role: UserRole.DEPARTMENT_USER,
        departmentId: department.id,
      })
    }

    await User.createMany(users)
  }
}

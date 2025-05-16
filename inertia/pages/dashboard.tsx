import { Head } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pill, AlertTriangle, ArrowDownCircle, ArrowUpCircle } from 'lucide-react'
import { MainLayout } from '~/layout/main_layout'

export default function Dashboard() {
  return (
    <>
      <Head title="Dashboard - Farmácia Adonis" />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-teal-900 mb-2">Dashboard</h1>
          <p className="text-lg text-teal-700 mb-8">
            Bem-vindo(a) ao painel de controle da Farmácia Adonis!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Medicamentos</CardTitle>
                <Pill className="h-6 w-6 text-teal-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-teal-900">1.250</div>
                <p className="text-xs text-gray-500 mt-1">Total cadastrados</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Entradas</CardTitle>
                <ArrowDownCircle className="h-6 w-6 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-teal-900">320</div>
                <p className="text-xs text-gray-500 mt-1">No mês</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Saídas</CardTitle>
                <ArrowUpCircle className="h-6 w-6 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-teal-900">295</div>
                <p className="text-xs text-gray-500 mt-1">No mês</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Alertas de Estoque</CardTitle>
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-teal-900">8</div>
                <p className="text-xs text-gray-500 mt-1">Itens críticos</p>
              </CardContent>
            </Card>
          </div>

          {/* Espaço para gráficos ou tabelas futuras */}
          <div className="bg-white rounded-xl shadow p-8 min-h-[200px] flex items-center justify-center text-gray-400">
            <span>Gráficos e relatórios em breve...</span>
          </div>
        </div>
      </div>
    </>
  )
}

Dashboard.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>
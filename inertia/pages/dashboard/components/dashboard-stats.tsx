import { ArrowDown, ArrowUp, Clock, Package, Pill, ShoppingCart } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardStats() {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Medicamentos</CardTitle>
          <Pill className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,843</div>
          <p className="text-xs text-muted-foreground">+34 novos itens este mês</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dispensações Hoje</CardTitle>
          <ShoppingCart className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">127</div>
          <div className="flex items-center text-xs text-green-500">
            <ArrowUp className="mr-1 h-3 w-3" />
            <span>+12% em relação a ontem</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Estoque Crítico</CardTitle>
          <Package className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">23</div>
          <div className="flex items-center text-xs text-red-500">
            <ArrowDown className="mr-1 h-3 w-3" />
            <span>+5 desde ontem</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Solicitações Pendentes</CardTitle>
          <Clock className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">18</div>
          <p className="text-xs text-muted-foreground">4 com prioridade alta</p>
        </CardContent>
      </Card>
    </>
  )
}

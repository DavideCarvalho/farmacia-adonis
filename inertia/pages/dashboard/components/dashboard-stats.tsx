import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { tuyau } from '~/api/utils/tuyau_client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'

function StatsContent() {
  const { data } = useSuspenseQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => tuyau.api.dashboard.stats.$get(),
  })

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Medicamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.data?.totalMedications}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Itens com Estoque Baixo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.data?.lowStockItems}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Solicitações Pendentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.data?.pendingRequests}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.data?.totalSales}</div>
        </CardContent>
      </Card>
    </>
  )
}

function ErrorFallback() {
  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          Erro ao carregar estatísticas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Não foi possível carregar as estatísticas do dashboard. Por favor, tente novamente mais
          tarde.
        </p>
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {
  return (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <Suspense
        fallback={
          <>
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-16 animate-pulse rounded bg-muted" />
                </CardContent>
              </Card>
            ))}
          </>
        }
      >
        <StatsContent />
      </Suspense>
    </ErrorBoundary>
  )
}

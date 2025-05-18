import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { tuyau } from '~/api/utils/tuyau_client'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, AlertCircle } from 'lucide-react'
import { useSuspenseQuery } from '@tanstack/react-query'

type Medication = {
  id: string
  name: string
  totalRequests: number
  stockLevel: number
  lastRequested: string | null
}

function TopMedicationsContent() {
  const { data } = useSuspenseQuery({
    queryKey: ['top-medications'],
    queryFn: () => tuyau.api.dashboard['top-medications'].$get()
  })

  const medications = data.data?.medications as Medication[]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medicamentos Mais Solicitados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medications?.map((medication) => (
            <div key={medication.id} className="flex items-center justify-between space-x-4">
              <div className="space-y-1">
                <p className="font-medium leading-none">{medication.name}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    {medication.totalRequests} solicitações
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Estoque: {medication.stockLevel} unidades
                  </span>
                </div>
              </div>
              {medication.lastRequested && (
                <span className="text-xs text-muted-foreground">
                  Última solicitação: {new Date(medication.lastRequested).toLocaleDateString('pt-BR')}
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ErrorFallback() {
  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          Erro ao carregar medicamentos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Não foi possível carregar a lista de medicamentos mais solicitados. Por favor, tente novamente mais tarde.
        </p>
      </CardContent>
    </Card>
  )
}

export function TopMedications() {
  return (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <Suspense fallback={
        <Card>
          <CardHeader>
            <CardTitle>Medicamentos Mais Solicitados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between space-x-4">
                  <div className="space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                  </div>
                  <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      }>
        <TopMedicationsContent />
      </Suspense>
    </ErrorBoundary>
  )
}

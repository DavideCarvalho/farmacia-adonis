import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { tuyau } from '~/api/utils/tuyau_client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { AlertCircle, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type Alert = {
  id: string
  medication: string
  type: 'low_stock' | 'expiring'
  message: string
  createdAt: string
}

function MedicationAlertsContent() {
  const { data } = useSuspenseQuery({
    queryKey: ['medication-alerts'],
    queryFn: () => tuyau.api.dashboard['medication-alerts'].$get()
  })

  const alerts = data.data?.alerts as Alert[]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertas de Medicamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts?.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-4">
              <div className="mt-1">
                {alert.type === 'low_stock' ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <Clock className="h-5 w-5 text-yellow-500" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{alert.medication}</p>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant={alert.type === 'low_stock' ? 'destructive' : 'warning'}>
                    {alert.type === 'low_stock' ? 'Estoque Baixo' : 'Próximo do Vencimento'}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(alert.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
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
          Erro ao carregar alertas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Não foi possível carregar os alertas de medicamentos. Por favor, tente novamente mais tarde.
        </p>
      </CardContent>
    </Card>
  )
}

export function MedicationAlerts() {
  return (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <Suspense fallback={
        <Card>
          <CardHeader>
            <CardTitle>Alertas de Medicamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="mt-1">
                    <div className="h-5 w-5 animate-pulse rounded-full bg-muted" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-48 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      }>
        <MedicationAlertsContent />
      </Suspense>
    </ErrorBoundary>
  )
}

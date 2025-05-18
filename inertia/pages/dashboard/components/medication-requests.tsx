"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { tuyau } from '~/api/utils/tuyau_client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, X, AlertCircle } from 'lucide-react'

function MedicationRequestsContent() {
  const { data } = useSuspenseQuery({
    queryKey: ['medication-requests'],
    queryFn: () => tuyau.api.dashboard['medication-requests'].$get()
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Solicitações de Medicamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.data?.requests.map((request) => (
            <div key={request.id} className="flex items-center justify-between space-x-4 rounded-md border p-4">
              <div className="space-y-1">
                <p className="font-medium leading-none">{request.medication}</p>
                <p className="text-sm text-muted-foreground">
                  {request.quantity} unidades • {request.department}
                </p>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{request.status}</Badge>
                  <span className="text-xs text-muted-foreground">
                    Solicitado por {request.requestedBy}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Check className="mr-2 h-4 w-4" />
                  Aprovar
                </Button>
                <Button size="sm" variant="outline" className="text-red-500">
                  <X className="mr-2 h-4 w-4" />
                  Rejeitar
                </Button>
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
          Erro ao carregar solicitações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Não foi possível carregar as solicitações de medicamentos. Por favor, tente novamente mais tarde.
        </p>
      </CardContent>
    </Card>
  )
}

export function MedicationRequests() {
  return (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <Suspense fallback={
        <Card>
          <CardHeader>
            <CardTitle>Solicitações de Medicamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between space-x-4 rounded-md border p-4">
                  <div className="space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-20 animate-pulse rounded bg-muted" />
                    <div className="h-8 w-20 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      }>
        <MedicationRequestsContent />
      </Suspense>
    </ErrorBoundary>
  )
}

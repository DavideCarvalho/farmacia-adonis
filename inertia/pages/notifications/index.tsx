import { Head } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bell, CheckCircle2, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { tuyau } from '~/api/utils/tuyau_client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'

function NotificationsContent() {
  const { data } = useSuspenseQuery({
    queryKey: ['notifications'],
    queryFn: () => tuyau.api.notifications.$get(),
  })

  return (
    <ScrollArea className="h-[600px]">
      <div className="space-y-4">
        {data.data?.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="mt-1">
              <Bell className="h-5 w-5 text-teal-600" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Nova prescrição para {notification.prescription.patient.name}
              </p>
              <p className="text-sm text-muted-foreground">
                Diagnóstico: {notification.prescription.diagnosis}
              </p>
              <p className="text-sm text-muted-foreground">
                Medicamentos: {notification.prescription.medications}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {format(new Date(notification.createdAt), "dd 'de' MMMM 'às' HH:mm", {
                  locale: ptBR,
                })}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-teal-600">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Revisar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

function ErrorFallback() {
  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          Erro ao carregar notificações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Não foi possível carregar as notificações. Por favor, tente novamente mais tarde.
        </p>
      </CardContent>
    </Card>
  )
}

export default function NotificationsIndex() {
  return (
    <>
      <Head title="Notificações - Farmácia Adonis" />
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Notificações</h1>
          <Button variant="outline" className="text-muted-foreground">
            Marcar todas como lidas
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Notificações Não Lidas</CardTitle>
            <CardDescription>Prescrições médicas aguardando sua revisão</CardDescription>
          </CardHeader>
          <CardContent>
            <ErrorBoundary fallbackRender={ErrorFallback}>
              <Suspense
                fallback={
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-4 rounded-lg border p-4">
                        <div className="h-5 w-5 animate-pulse rounded bg-muted" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                          <div className="h-4 w-64 animate-pulse rounded bg-muted" />
                          <div className="h-4 w-56 animate-pulse rounded bg-muted" />
                          <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                        </div>
                        <div className="h-8 w-24 animate-pulse rounded bg-muted" />
                      </div>
                    ))}
                  </div>
                }
              >
                <NotificationsContent />
              </Suspense>
            </ErrorBoundary>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

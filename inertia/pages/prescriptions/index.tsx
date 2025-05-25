import { Head } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Clock, CheckCircle2, XCircle, Check, ChevronsUpDown } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { tuyau } from '~/api/utils/tuyau_client'
import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import { DashboardShell } from '~/layout/dashboard-layout'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { useForm, ControllerRenderProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const createPrescriptionSchema = z.object({
  patientId: z.string().min(1, 'Paciente é obrigatório'),
  diagnosis: z.string().min(1, 'Diagnóstico é obrigatório'),
  medications: z.string().min(1, 'Medicamentos são obrigatórios'),
})

type CreatePrescriptionFormData = z.infer<typeof createPrescriptionSchema>

interface Patient {
  id: string
  fullName: string
}

function getStatusBadge(status: 'pending' | 'approved' | 'rejected') {
  switch (status) {
    case 'pending':
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pendente
        </Badge>
      )
    case 'approved':
      return (
        <Badge variant="default" className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Aprovada
        </Badge>
      )
    case 'rejected':
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Rejeitada
        </Badge>
      )
  }
}

function PrescriptionsContent() {
  const { data } = useSuspenseQuery({
    queryKey: ['prescriptions'],
    queryFn: () => tuyau.api.prescriptions.$get(),
  })

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Paciente</TableHead>
          <TableHead>Diagnóstico</TableHead>
          <TableHead>Medicamentos</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Data</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data?.map((prescription) => (
          <TableRow key={prescription.id}>
            <TableCell className="font-medium">{prescription.patient?.fullName ?? ''}</TableCell>
            <TableCell>{prescription.diagnosis}</TableCell>
            <TableCell>{prescription.medications}</TableCell>
            <TableCell>{getStatusBadge(prescription.status)}</TableCell>
            <TableCell>
              {format(new Date(prescription.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                Ver detalhes
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function ErrorFallback() {
  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          Erro ao carregar prescrições
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Não foi possível carregar as prescrições. Por favor, tente novamente mais tarde.
        </p>
      </CardContent>
    </Card>
  )
}

function PatientsCombobox({
  field,
}: {
  field: ControllerRenderProps<CreatePrescriptionFormData, 'patientId'>
}) {
  const [search, setSearch] = useState('')
  const { data: patients } = useSuspenseQuery({
    queryKey: ['patients', search],
    queryFn: () => tuyau.api.patients.$get({ query: { search } }),
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
          >
            {field.value
              ? patients.data?.find((patient) => patient.id === field.value)?.fullName
              : 'Selecione um paciente'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar paciente..." value={search} onValueChange={setSearch} />
          <CommandList>
            <CommandEmpty>Nenhum paciente encontrado.</CommandEmpty>
            <CommandGroup>
              {patients.data?.map((patient) => (
                <CommandItem
                  value={patient.id}
                  key={patient.id}
                  onSelect={() => {
                    field.onChange(patient.id)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      patient.id === field.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {patient.fullName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function CreatePrescriptionDialog() {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm<CreatePrescriptionFormData>({
    resolver: zodResolver(createPrescriptionSchema),
    defaultValues: {
      patientId: '',
      diagnosis: '',
      medications: '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreatePrescriptionFormData) => tuyau.api.prescriptions.$post(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] })
      setOpen(false)
      form.reset()
      toast.success('Prescrição criada com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao criar prescrição. Tente novamente.')
    },
  })

  function onSubmit(data: CreatePrescriptionFormData) {
    mutate(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" />
          Nova Prescrição
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Prescrição</DialogTitle>
          <DialogDescription>
            Preencha os dados da prescrição médica para criar uma nova prescrição.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="patientId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Paciente</FormLabel>
                  <Suspense
                    fallback={<div className="h-10 w-full animate-pulse rounded bg-muted" />}
                  >
                    <PatientsCombobox field={field} />
                  </Suspense>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="diagnosis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnóstico</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medicamentos</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Criando...' : 'Criar Prescrição'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default function PrescriptionsPage() {
  return (
    <>
      <Head title="Prescrições - Farmácia Adonis" />
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Prescrições</h1>
          <CreatePrescriptionDialog />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Prescrições Recentes</CardTitle>
            <CardDescription>
              Lista de prescrições médicas para revisão farmacêutica
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ErrorBoundary fallbackRender={ErrorFallback}>
              <Suspense
                fallback={
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                        <div className="h-8 w-24 animate-pulse rounded bg-muted" />
                      </div>
                    ))}
                  </div>
                }
              >
                <PrescriptionsContent />
              </Suspense>
            </ErrorBoundary>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

PrescriptionsPage.layout = (page: React.ReactNode) => <DashboardShell>{page}</DashboardShell>

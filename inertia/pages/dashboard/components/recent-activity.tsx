import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Activity, CheckCircle, Clock, Package, Pill, ShoppingCart, XCircle } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "dispensation",
      user: {
        name: "Ana Silva",
        image: "/placeholder.svg?height=32&width=32",
        role: "Farmacêutica",
      },
      department: "Clínica Médica",
      medication: "Dipirona 500mg",
      quantity: 10,
      timestamp: new Date(2025, 4, 16, 14, 30),
    },
    {
      id: 2,
      type: "stock",
      user: {
        name: "Carlos Santos",
        image: "/placeholder.svg?height=32&width=32",
        role: "Técnico de Farmácia",
      },
      medication: "Amoxicilina 500mg",
      quantity: 50,
      timestamp: new Date(2025, 4, 16, 13, 45),
    },
    {
      id: 3,
      type: "request_approved",
      user: {
        name: "Mariana Costa",
        image: "/placeholder.svg?height=32&width=32",
        role: "Farmacêutica Chefe",
      },
      department: "UTI",
      medication: "Noradrenalina 2mg/ml",
      quantity: 5,
      timestamp: new Date(2025, 4, 16, 11, 20),
    },
    {
      id: 4,
      type: "request_rejected",
      user: {
        name: "Mariana Costa",
        image: "/placeholder.svg?height=32&width=32",
        role: "Farmacêutica Chefe",
      },
      department: "Emergência",
      medication: "Morfina 10mg/ml",
      quantity: 3,
      reason: "Documentação incompleta",
      timestamp: new Date(2025, 4, 16, 10, 15),
    },
    {
      id: 5,
      type: "dispensation",
      user: {
        name: "Pedro Oliveira",
        image: "/placeholder.svg?height=32&width=32",
        role: "Técnico de Farmácia",
      },
      department: "Pediatria",
      medication: "Amoxicilina Susp. 250mg/5ml",
      quantity: 8,
      timestamp: new Date(2025, 4, 16, 9, 30),
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "dispensation":
        return <ShoppingCart className="h-4 w-4 text-teal-600" />
      case "stock":
        return <Package className="h-4 w-4 text-teal-600" />
      case "request_approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "request_rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Pill className="h-4 w-4 text-teal-600" />
    }
  }

  const getActivityDescription = (activity: any) => {
    switch (activity.type) {
      case "dispensation":
        return `Dispensou ${activity.quantity} unidades de ${activity.medication} para ${activity.department}`
      case "stock":
        return `Adicionou ${activity.quantity} unidades de ${activity.medication} ao estoque`
      case "request_approved":
        return `Aprovou solicitação de ${activity.quantity} unidades de ${activity.medication} para ${activity.department}`
      case "request_rejected":
        return `Rejeitou solicitação de ${activity.quantity} unidades de ${activity.medication} para ${activity.department}. Motivo: ${activity.reason}`
      default:
        return ""
    }
  }

  const formatTimestamp = (date: Date) => {
    return format(date, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Atividades Recentes</CardTitle>
          <Activity className="h-4 w-4 text-teal-600" />
        </div>
        <CardDescription>Últimas ações realizadas no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="mr-4 mt-0.5">
                <Avatar className="h-9 w-9 border">
                  <AvatarImage src={activity.user.image || "/placeholder.svg"} alt={activity.user.name} />
                  <AvatarFallback>
                    {activity.user.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium leading-none">{activity.user.name}</p>
                  <div className="flex items-center gap-1">
                    {getActivityIcon(activity.type)}
                    <span className="text-xs text-muted-foreground">{activity.user.role}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{getActivityDescription(activity)}</p>
                <div className="flex items-center gap-2 pt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{formatTimestamp(activity.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

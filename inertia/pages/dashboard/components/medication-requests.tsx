"use client"

import { useState } from "react"
import { CheckCircle2, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export function MedicationRequests() {
  const { toast } = useToast()
  const [requests, setRequests] = useState([
    {
      id: 1,
      department: "UTI",
      medication: "Noradrenalina 2mg/ml",
      quantity: 5,
      requestedBy: "Dr. Carlos Silva",
      priority: "high",
      status: "pending",
    },
    {
      id: 2,
      department: "Pediatria",
      medication: "Amoxicilina Susp. 250mg/5ml",
      quantity: 10,
      requestedBy: "Dra. Ana Souza",
      priority: "medium",
      status: "pending",
    },
    {
      id: 3,
      department: "Emergência",
      medication: "Adrenalina 1mg/ml",
      quantity: 8,
      requestedBy: "Dr. Paulo Mendes",
      priority: "high",
      status: "pending",
    },
    {
      id: 4,
      department: "Clínica Médica",
      medication: "Metoclopramida 10mg",
      quantity: 15,
      requestedBy: "Dra. Juliana Costa",
      priority: "low",
      status: "pending",
    },
    {
      id: 5,
      department: "Oncologia",
      medication: "Ondansetrona 8mg",
      quantity: 12,
      requestedBy: "Dr. Roberto Alves",
      priority: "medium",
      status: "pending",
    },
  ])

  const handleApprove = (id: number) => {
    setRequests(requests.map((request) => (request.id === id ? { ...request, status: "approved" } : request)))
    toast({
      title: "Solicitação aprovada",
      description: "A solicitação foi aprovada com sucesso.",
    })
  }

  const handleReject = (id: number) => {
    setRequests(requests.map((request) => (request.id === id ? { ...request, status: "rejected" } : request)))
    toast({
      title: "Solicitação rejeitada",
      description: "A solicitação foi rejeitada.",
      variant: "destructive",
    })
  }

  const pendingRequests = requests.filter((request) => request.status === "pending")
  const approvedRequests = requests.filter((request) => request.status === "approved")
  const rejectedRequests = requests.filter((request) => request.status === "rejected")

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Solicitações de Medicamentos</CardTitle>
        <CardDescription>Gerencie as solicitações de medicamentos dos departamentos</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Pendentes ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="approved">Aprovadas ({approvedRequests.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejeitadas ({rejectedRequests.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="space-y-4">
            {pendingRequests.length === 0 ? (
              <p className="text-center text-muted-foreground">Não há solicitações pendentes.</p>
            ) : (
              pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col space-y-3 rounded-md border p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{request.medication}</p>
                      <Badge
                        variant={
                          request.priority === "high"
                            ? "destructive"
                            : request.priority === "medium"
                              ? "default"
                              : "outline"
                        }
                      >
                        {request.priority === "high" ? "Alta" : request.priority === "medium" ? "Média" : "Baixa"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        {request.quantity} unidades • {request.department} • {request.requestedBy}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
                      onClick={() => handleApprove(request.id)}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Aprovar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => handleReject(request.id)}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Rejeitar
                    </Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
          <TabsContent value="approved" className="space-y-4">
            {approvedRequests.length === 0 ? (
              <p className="text-center text-muted-foreground">Não há solicitações aprovadas.</p>
            ) : (
              approvedRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col space-y-3 rounded-md border p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{request.medication}</p>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        {request.quantity} unidades • {request.department} • {request.requestedBy}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-600">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Aprovada
                  </Badge>
                </div>
              ))
            )}
          </TabsContent>
          <TabsContent value="rejected" className="space-y-4">
            {rejectedRequests.length === 0 ? (
              <p className="text-center text-muted-foreground">Não há solicitações rejeitadas.</p>
            ) : (
              rejectedRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col space-y-3 rounded-md border p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{request.medication}</p>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        {request.quantity} unidades • {request.department} • {request.requestedBy}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-red-50 text-red-600">
                    <XCircle className="mr-2 h-4 w-4" />
                    Rejeitada
                  </Badge>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

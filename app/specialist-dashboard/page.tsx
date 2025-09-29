"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  DollarSign,
  Star,
  Clock,
  MapPin,
  Bell,
  Settings,
  LogOut,
  TrendingUp,
  CheckCircle,
  Eye,
  PawPrint,
  Hand,
} from "lucide-react"
import Link from "next/link"

export default function SpecialistDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const specialist = {
    name: "Dr. Ana Reptiliana",
    rating: 4.9,
    reviews: 127,
    image: "/woman-smiling-dog.png",
    specialties: ["Répteis", "Anfíbios"],
    verified: true,
  }

  const stats = {
    totalEarnings: 12450,
    pendingPayments: 850,
    completedServices: 89,
    upcomingAppointments: 5,
  }

  const upcomingAppointments = [
    {
      id: 1,
      client: "Maria Silva",
      animal: "Iguana Verde",
      date: "2025-01-15",
      time: "14:00",
      address: "Rua das Flores, 123 - Vila Madalena",
      price: 150,
      status: "confirmed",
    },
    {
      id: 2,
      client: "João Santos",
      animal: "Gecko Leopardo",
      date: "2025-01-16",
      time: "10:30",
      address: "Av. Paulista, 456 - Bela Vista",
      price: 120,
      status: "pending",
    },
    {
      id: 3,
      client: "Ana Costa",
      animal: "Pogona",
      date: "2025-01-17",
      time: "16:00",
      address: "Rua Augusta, 789 - Consolação",
      price: 150,
      status: "confirmed",
    },
  ]

  const recentPayments = [
    {
      id: 1,
      client: "Carlos Oliveira",
      amount: 300,
      date: "2025-01-10",
      status: "paid",
      service: "Plano Semanal - Iguana",
    },
    {
      id: 2,
      client: "Fernanda Lima",
      amount: 150,
      date: "2025-01-08",
      status: "pending",
      service: "Visita Única - Gecko",
    },
    {
      id: 3,
      client: "Roberto Silva",
      amount: 480,
      date: "2025-01-05",
      status: "paid",
      service: "Plano Mensal - Pogona",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <PawPrint className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">ExoticCare</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={specialist.image || "/placeholder.svg"} alt={specialist.name} />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <span className="hidden md:block font-medium">{specialist.name}</span>
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Link href="/specialist-login">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-bold mb-2">
            Bem-vindo, {specialist.name.split(" ")[1]}! <Hand className="h-7 w-7 text-yellow-400" />
          </h1>
          <p className="text-muted-foreground">Gerencie seus serviços e acompanhe seus ganhos</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
            <TabsTrigger value="wallet">Carteira</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Ganhos Totais</p>
                      <p className="text-2xl font-bold">R$ {stats.totalEarnings.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">+12% este mês</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pagamentos Pendentes</p>
                      <p className="text-2xl font-bold">R$ {stats.pendingPayments}</p>
                    </div>
                    <Clock className="h-8 w-8 text-secondary" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Liberação em 2-3 dias</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Serviços Realizados</p>
                      <p className="text-2xl font-bold">{stats.completedServices}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-accent" />
                  </div>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm">
                      {specialist.rating} ({specialist.reviews} avaliações)
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Próximos Agendamentos</p>
                      <p className="text-2xl font-bold">{stats.upcomingAppointments}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Esta semana</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Próximos Agendamentos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.slice(0, 3).map((appointment) => (
                    <div key={appointment.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{appointment.client}</span>
                          <Badge
                            variant={appointment.status === "confirmed" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {appointment.status === "confirmed" ? "Confirmado" : "Pendente"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{appointment.animal}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {appointment.date} às {appointment.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {appointment.address.split(" - ")[1]}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">R$ {appointment.price}</p>
                        <Button size="sm" variant="outline" className="mt-1 bg-transparent">
                          <Eye className="h-3 w-3 mr-1" />
                          Ver
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pagamentos Recentes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentPayments.slice(0, 3).map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{payment.client}</p>
                        <p className="text-sm text-muted-foreground">{payment.service}</p>
                        <p className="text-xs text-muted-foreground">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">R$ {payment.amount}</p>
                        <Badge variant={payment.status === "paid" ? "default" : "secondary"} className="text-xs">
                          {payment.status === "paid" ? "Pago" : "Pendente"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Agenda Tab */}
          <TabsContent value="agenda" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agenda de Serviços</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{appointment.client}</h3>
                        <p className="text-muted-foreground">{appointment.animal}</p>
                      </div>
                      <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"} className="text-xs">
                        {appointment.status === "confirmed" ? "Confirmado" : "Pendente"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {appointment.date} às {appointment.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>R$ {appointment.price}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 mt-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground">{appointment.address}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        Ver Detalhes
                      </Button>
                      <Button size="sm" variant="outline">
                        Contatar Cliente
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Saldo Disponível</p>
                    <p className="text-3xl font-bold text-primary">R$ 2.340</p>
                    <Button size="sm" className="mt-4">
                      Sacar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Pendente (3 dias)</p>
                    <p className="text-3xl font-bold text-secondary">R$ {stats.pendingPayments}</p>
                    <p className="text-xs text-muted-foreground mt-2">Liberação automática</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Este Mês</p>
                    <p className="text-3xl font-bold text-accent">R$ 1.890</p>
                    <div className="flex items-center justify-center mt-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500">+12%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Pagamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{payment.client}</p>
                        <p className="text-sm text-muted-foreground">{payment.service}</p>
                        <p className="text-xs text-muted-foreground">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg">R$ {payment.amount}</p>
                        <Badge variant={payment.status === "paid" ? "default" : "secondary"}>
                          {payment.status === "paid" ? "Pago" : "Pendente"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardContent className="p-6 text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={specialist.image || "/placeholder.svg"} alt={specialist.name} />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{specialist.name}</h3>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{specialist.rating}</span>
                    <span className="text-muted-foreground text-sm">({specialist.reviews})</span>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center mt-3">
                    {specialist.specialties.map((specialty, i) => (
                      <Badge key={i} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    Editar Perfil
                  </Button>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Informações Profissionais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Certificações</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Veterinária - USP</span>
                        <Badge variant="default">Verificado</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Certificado IBAMA</span>
                        <Badge variant="default">Verificado</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Especialização em Répteis</span>
                        <Badge variant="default">Verificado</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Estatísticas</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-2xl font-bold">{stats.completedServices}</p>
                        <p className="text-sm text-muted-foreground">Serviços Realizados</p>
                      </div>
                      <div className="p-3 border rounded-lg text-center">
                        <p className="text-2xl font-bold">8 anos</p>
                        <p className="text-sm text-muted-foreground">Experiência</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Perfil de Completude</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Perfil Completo</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Complete seu perfil para receber mais solicitações
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
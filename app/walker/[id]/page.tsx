import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Clock, Heart, Phone, MessageCircle, Calendar, Camera, Shield, Award } from "lucide-react"
import Link from "next/link"

// Mock data - em um app real viria de uma API
const walkerData = {
  id: "1",
  name: "Ana Silva",
  rating: 4.9,
  reviews: 127,
  location: "Vila Madalena, SP",
  experience: "3 anos",
  image: "/woman-smiling-dog.png",
  badges: ["Verificado", "Emergência", "Seguro Pet"],
  description:
    "Apaixonada por animais desde criança, trabalho como passeadora há 3 anos. Tenho experiência com cães de todos os portes e idades. Ofereço cuidado personalizado e muita atenção para cada pet.",
  services: ["Passeio", "Alimentação", "Medicação", "Companhia"],
  availability: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
  phone: "(11) 99999-9999",
  pricing: {
    daily: { price: 25, duration: "30-60min" },
    weekly: { price: 150, duration: "5 passeios", discount: "17% off" },
    monthly: { price: 550, duration: "22 passeios", discount: "27% off" },
  },
  stats: {
    totalWalks: 1250,
    happyPets: 89,
    responseTime: "< 2h",
  },
}

const reviewsData = [
  {
    id: 1,
    owner: "Carlos M.",
    rating: 5,
    date: "2024-01-15",
    comment:
      "Ana é incrível! Meu Golden Retriever adora os passeios com ela. Sempre recebo fotos e relatórios detalhados.",
    petName: "Thor",
  },
  {
    id: 2,
    owner: "Maria L.",
    rating: 5,
    date: "2024-01-10",
    comment: "Profissional exemplar. Muito cuidadosa e carinhosa com minha Lulu. Recomendo de olhos fechados!",
    petName: "Lulu",
  },
  {
    id: 3,
    owner: "João P.",
    rating: 4,
    date: "2024-01-05",
    comment: "Ótimo serviço. Ana é pontual e meu cachorro sempre volta feliz e cansado dos passeios.",
    petName: "Rex",
  },
]

const walkHistory = [
  {
    id: 1,
    date: "2024-01-20",
    pet: "Thor",
    owner: "Carlos M.",
    duration: "45min",
    photos: 8,
    route: "Parque Villa-Lobos",
  },
  {
    id: 2,
    date: "2024-01-19",
    pet: "Lulu",
    owner: "Maria L.",
    duration: "30min",
    photos: 5,
    route: "Praça da República",
  },
  {
    id: 3,
    date: "2024-01-18",
    pet: "Rex",
    owner: "João P.",
    duration: "60min",
    photos: 12,
    route: "Parque Ibirapuera",
  },
]

export default function WalkerProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">🐕</span>
            </div>
            <span className="font-bold text-xl text-foreground">PetWalk</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Voltar
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-24 w-24 ring-4 ring-primary/10">
                    <AvatarImage src={walkerData.image || "/placeholder.svg"} alt={walkerData.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xl">
                      {walkerData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{walkerData.name}</h1>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-lg">{walkerData.rating}</span>
                            <span className="text-muted-foreground">({walkerData.reviews} avaliações)</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground mb-3">
                          <MapPin className="h-4 w-4" />
                          {walkerData.location}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500">
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {walkerData.badges.map((badge, i) => (
                        <Badge key={i} variant="secondary" className="flex items-center gap-1">
                          {badge === "Verificado" && <Shield className="h-3 w-3" />}
                          {badge === "Emergência" && <Phone className="h-3 w-3" />}
                          {badge === "Seguro Pet" && <Award className="h-3 w-3" />}
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-muted-foreground mb-4">{walkerData.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{walkerData.experience} de experiência</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>Disponível {walkerData.availability.length} dias/semana</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Pricing Plans */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Planos de Serviço</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">Diário</h4>
                        <p className="text-sm text-muted-foreground">{walkerData.pricing.daily.duration}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">R$ {walkerData.pricing.daily.price}</div>
                        <div className="text-sm text-muted-foreground">por passeio</div>
                      </div>
                    </div>
                    <Button className="w-full" size="sm">
                      Agendar
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer relative">
                    <Badge className="absolute -top-2 left-4 bg-secondary text-secondary-foreground">
                      {walkerData.pricing.weekly.discount}
                    </Badge>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">Semanal</h4>
                        <p className="text-sm text-muted-foreground">{walkerData.pricing.weekly.duration}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">R$ {walkerData.pricing.weekly.price}</div>
                        <div className="text-sm text-muted-foreground">por semana</div>
                      </div>
                    </div>
                    <Button className="w-full" size="sm">
                      Contratar
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer relative">
                    <Badge className="absolute -top-2 left-4 bg-primary text-primary-foreground">
                      {walkerData.pricing.monthly.discount}
                    </Badge>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">Mensal</h4>
                        <p className="text-sm text-muted-foreground">{walkerData.pricing.monthly.duration}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">R$ {walkerData.pricing.monthly.price}</div>
                        <div className="text-sm text-muted-foreground">por mês</div>
                      </div>
                    </div>
                    <Button className="w-full" size="sm" variant="default">
                      Melhor Oferta
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Conversar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Ligar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{walkerData.stats.totalWalks}</div>
                    <div className="text-sm text-muted-foreground">Passeios Realizados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{walkerData.stats.happyPets}</div>
                    <div className="text-sm text-muted-foreground">Pets Atendidos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{walkerData.stats.responseTime}</div>
                    <div className="text-sm text-muted-foreground">Tempo de Resposta</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              {reviewsData.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{review.owner}</span>
                          <span className="text-sm text-muted-foreground">• Pet: {review.petName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <div className="space-y-4">
              {walkHistory.map((walk) => (
                <Card key={walk.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{walk.pet}</span>
                          <span className="text-sm text-muted-foreground">• {walk.owner}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {walk.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Camera className="h-3 w-3" />
                            {walk.photos} fotos
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {walk.route}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{walk.date}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Ver Fotos
                      </Button>
                      <Button variant="outline" size="sm">
                        Ver Rota
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

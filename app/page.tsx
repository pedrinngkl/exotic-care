import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  MapPin,
  Star,
  Clock,
  Heart,
  Search,
  Filter,
  Menu,
  Shield,
  Award,
  GraduationCap,
  Stethoscope,
  PawPrint,
  Bird,
  Squirrel,
  Bug,
  ClipboardList,
  Target,
  CalendarDays,
  BarChart3,
  Turtle,
} from "lucide-react"
import Link from "next/link"

// --- NOVA FUNÇÃO PARA BUSCAR DADOS DO BANCO ---
// Esta função será executada no servidor para buscar os dados da sua API,
// que por sua vez, busca os dados no Supabase.
async function getSpecialists() {
  try {
    // Quando em desenvolvimento, precisamos usar a URL completa. Em produção, o Next.js lida com isso.
    // A opção { cache: 'no-store' } garante que os dados sejam sempre frescos do banco.
    const res = await fetch('http://localhost:3000/api/specialists', { cache: 'no-store' });

    if (!res.ok) {
      // Se a API retornar um erro, nós o exibimos no console.
      console.error("Falha ao buscar dados da API:", await res.text());
      return []; // Retorna um array vazio para não quebrar a página.
    }
    
    return res.json();
  } catch (error) {
    console.error("Erro de conexão ao buscar especialistas:", error);
    return []; // Retorna um array vazio em caso de erro de rede.
  }
}


export default async function HomePage() {
  // --- BUSCANDO OS DADOS REAIS ---
  // A lista de especialistas agora vem diretamente do seu banco de dados!
  const specialists = await getSpecialists();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <PawPrint className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">ExoticCare</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Encontrar Especialista
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Ser Cuidador
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Certificações
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              Entrar
            </Button>
            <Link href="/specialist-login">
              <Button variant="outline" size="sm" className="hidden md:flex bg-transparent">
                Área do Especialista
              </Button>
            </Link>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Cadastrar
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Cuidadores <span className="text-primary">especializados</span> para animais exóticos
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Conecte-se com profissionais certificados e experientes no cuidado de répteis, aves raras, primatas e outros
            animais exóticos.
          </p>

          {/* Animal Selection */}
          <div className="max-w-4xl mx-auto mb-8">
            <h3 className="text-lg font-semibold mb-4">Qual tipo de animal você possui?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "Répteis", icon: <Turtle className="h-8 w-8 text-primary mx-auto" />, count: "45 especialistas" },
                { name: "Aves Exóticas", icon: <Bird className="h-8 w-8 text-primary mx-auto" />, count: "32 especialistas" },
                { name: "Mamíferos", icon: <Squirrel className="h-8 w-8 text-primary mx-auto" />, count: "18 especialistas" },
                { name: "Anfíbios & Insetos", icon: <Bug className="h-8 w-8 text-primary mx-auto" />, count: "28 especialistas" },
              ].map((animal, index) => (
                <Card
                  key={index}
                  className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary"
                >
                  <CardContent className="p-4 text-center">
                    <div className="mb-2">{animal.icon}</div>
                    <div className="font-medium text-sm">{animal.name}</div>
                    <div className="text-xs text-muted-foreground">{animal.count}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-xl border shadow-lg">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Digite seu CEP ou cidade..."
                  className="pl-10 border-0 bg-transparent focus-visible:ring-0"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90 px-8">Buscar Especialistas</Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">120+</div>
              <div className="text-sm text-muted-foreground">Especialistas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">850+</div>
              <div className="text-sm text-muted-foreground">Animais Cuidados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.9</div>
              <div className="text-sm text-muted-foreground">Avaliação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Specialists */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Especialistas Certificados</h2>
              <p className="text-muted-foreground">Profissionais com as mais altas qualificações da sua região</p>
            </div>
            <Button variant="outline" className="hidden md:flex bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* O .map agora usa a variável 'specialists' que vem do banco de dados */}
            {specialists.map((specialist: any) => (
              <Card key={specialist.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={specialist.image || "/placeholder.svg"} alt={specialist.name} />
                      <AvatarFallback>
                        {specialist.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{specialist.name}</CardTitle>
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{specialist.rating}</span>
                        <span className="text-muted-foreground text-sm">({specialist.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                        <MapPin className="h-3 w-3" />
                        {specialist.location}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <GraduationCap className="h-3 w-3" />
                        {specialist.education}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {specialist.badges.map((badge: string, i: number) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className="mb-3">
                    <div className="text-sm font-medium mb-1">Especialidades:</div>
                    <div className="text-sm text-muted-foreground">{specialist.specialties ? specialist.specialties.join(", ") : 'Não informado'}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-lg">
                        {specialist.price}
                        <span className="text-sm font-normal text-muted-foreground">/visita</span>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {specialist.experience} de experiência
                      </div>
                    </div>
                    <Link href={`/specialist/${specialist.id}`}>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Ver Perfil
                      </Button>
                    </Link>
                    <Link href="/checkout">
                      <Button size="sm" variant="outline" className="ml-2 bg-transparent">
                        Contratar
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Ver Todos os Especialistas
            </Button>
          </div>
        </div>
      </section>
      
      {/* O resto do seu código continua igual... */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Processo seguro e especializado para o cuidado do seu animal exótico
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Cadastre seu Animal",
                description: "Informe espécie, idade, necessidades especiais e histórico médico do seu animal exótico.",
                icon: <ClipboardList className="h-8 w-8 text-primary" />,
              },
              {
                step: "2",
                title: "Receba Recomendações",
                description: "Nosso sistema indica especialistas qualificados e frequência ideal de cuidados.",
                icon: <Target className="h-8 w-8 text-primary" />,
              },
              {
                step: "3",
                title: "Agende com Especialista",
                description: "Escolha profissional certificado, data e tipo de serviço. Pagamento seguro intermediado.",
                icon: <CalendarDays className="h-8 w-8 text-primary" />,
              },
              {
                step: "4",
                title: "Acompanhe o Cuidado",
                description: "Receba relatórios detalhados. Pagamento liberado 3 dias após confirmação do serviço.",
                icon: <BarChart3 className="h-8 w-8 text-primary" />,
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Segurança e Confiança</h2>
            <p className="text-muted-foreground text-lg">
              Todos os nossos especialistas passam por rigoroso processo de verificação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Certificações Verificadas",
                description: "Diplomas, certificados e licenças profissionais validados por nossa equipe.",
                icon: <Award className="h-8 w-8 text-accent" />,
              },
              {
                title: "Experiência Comprovada",
                description: "Histórico profissional e referências de outros clientes verificadas.",
                icon: <Shield className="h-8 w-8 text-secondary" />,
              },
              {
                title: "Seguro Incluso",
                description: "Todos os serviços cobertos por seguro para sua tranquilidade total.",
                icon: <Stethoscope className="h-8 w-8 text-primary" />,
              },
            ].map((item, index) => (
              <Card key={index} className="text-center p-6">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Seu animal exótico merece cuidado especializado</h2>
          <p className="text-xl mb-8 opacity-90">Conecte-se com profissionais certificados em todo o Brasil</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Encontrar Especialista
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              Quero Ser Cuidador
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <PawPrint className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">ExoticCare</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Conectando animais exóticos com cuidadores especializados.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Para Proprietários</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Encontrar Especialista
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Cadastrar Animal
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Recomendações
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Segurança
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Para Especialistas</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Cadastre-se
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Certificações
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Requisitos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Ganhos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 ExoticCare. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
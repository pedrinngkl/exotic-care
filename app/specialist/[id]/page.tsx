// Em app/specialist/[id]/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  MapPin, Star, Heart, Award, GraduationCap, Calendar, DollarSign,
  CheckCircle, MessageCircle, Phone,
} from "lucide-react";
import Link from "next/link";
import { PrismaClient } from '@prisma/client';

// Cria uma instância do Prisma para se conectar ao banco de dados
const prisma = new PrismaClient();

// --- FUNÇÃO OBRIGATÓRIA PARA EXPORTAÇÃO ESTÁTICA ---
// Esta função busca os IDs de todos os especialistas no banco de dados
// e informa ao Next.js quais páginas HTML ele precisa gerar durante o build.
// Ex: /specialist/1.html, /specialist/2.html, etc.
export async function generateStaticParams() {
  const specialists = await prisma.specialists.findMany({
    select: { id: true }, // Pega apenas os IDs
  });

  return specialists.map((specialist) => ({
    id: specialist.id.toString(),
  }));
}

// --- FUNÇÃO PARA BUSCAR OS DADOS DE UM ÚNICO ESPECIALISTA ---
// Esta função é chamada para cada página gerada para buscar os detalhes completos.
async function getSpecialistById(id: string) {
  try {
    // Como a API não está disponível durante o build, usamos o Prisma diretamente
    const specialist = await prisma.specialists.findUnique({
      where: { id: parseInt(id) },
    });
    return specialist;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function SpecialistProfile({ params }: { params: { id: string } }) {
  const specialist = await getSpecialistById(params.id);

  // Se o especialista não for encontrado no banco, mostra uma mensagem
  if (!specialist) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Especialista não encontrado</h1>
      </div>
    )
  }

  // O resto do seu componente para renderizar a página com os dados do banco
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl text-foreground">ExoticCare</span>
          </Link>
          <Button variant="outline" asChild>
            <Link href="/">Voltar à Busca</Link>
          </Button>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={specialist.image || "/placeholder.svg"} alt={specialist.name} />
                <AvatarFallback className="text-2xl">
                  {specialist.name.split(" ").map((n: string) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl mb-1">{specialist.name}</CardTitle>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{specialist.rating.toString()}</span>
                    <span className="text-muted-foreground">({specialist.reviews} avaliações)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {specialist.location}
                  </div>
                </div>
                {/* Adicione outros campos do banco de dados aqui conforme necessário */}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{specialist.bio}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
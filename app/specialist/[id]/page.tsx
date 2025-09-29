// app/specialist/[id]/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MapPin, Star } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma"; // 👈 usa a instância única do Prisma

// --- FUNÇÃO PARA BUSCAR OS DADOS DE UM ÚNICO ESPECIALISTA ---
async function getSpecialistById(id: string) {
  try {
    return await prisma.specialist.findUnique({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function SpecialistProfile({ params }: { params: { id: string } }) {
  const specialist = await getSpecialistById(params.id);

  if (!specialist) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Especialista não encontrado</h1>
      </div>
    );
  }

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
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{specialist.bio}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Em app/checkout/page.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, CreditCard, Shield, Calendar, MapPin, Star, CheckCircle } from "lucide-react"
import Link from "next/link"

// Reutilizamos a mesma lógica para buscar um especialista
async function getSpecialistById(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/specialists/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}


export default async function CheckoutPage() {
  // Por enquanto, pegamos o especialista com ID=1 como exemplo.
  // No futuro, você passaria o ID do especialista selecionado para esta página.
  const specialist = await getSpecialistById("1");

  if (!specialist) {
    return <div>Carregando informações do especialista...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Voltar</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">ExoticCare</span>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coluna da Esquerda - Formulário */}
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold">Finalizar Contratação</h1>
            {/* ... O resto do seu formulário ... */}
          </div>

          {/* Coluna da Direita - Resumo */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Especialista Selecionado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={specialist.image || "/placeholder.svg"} alt={specialist.name} />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{specialist.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{specialist.rating}</span>
                      <span className="text-muted-foreground text-sm">({specialist.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* ... O resto do resumo do pedido ... */}
          </div>
        </div>
      </div>
    </div>
  )
}
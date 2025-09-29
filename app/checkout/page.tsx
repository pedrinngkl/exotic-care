"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, CreditCard, Shield, Calendar, MapPin, Star, CheckCircle, PawPrint } from "lucide-react"
import Link from "next/link"
import { specialists } from "@/lib/data"

export default function CheckoutPage() {
  // Simula a seleção do primeiro especialista da lista para o checkout
  const specialist = specialists[0];
  
  // O primeiro plano do especialista será o padrão, ou 'daily' se não houver planos.
  const defaultPlanKey = specialist.plans && specialist.plans.length > 0 ? specialist.plans[0].name : 'Visita Única';
  const [selectedPlanName, setSelectedPlanName] = useState(defaultPlanKey);
  const [paymentMethod, setPaymentMethod] = useState("credit");

  // Adiciona uma opção de "Visita Única" caso o especialista não tenha planos
  const availablePlans = [
    { name: "Visita Única", price: parseFloat(specialist.price.replace('R$ ', '')), discount: 0, description: "Um único atendimento" },
    ...(specialist.plans || [])
  ];

  const selectedPlanData = availablePlans.find(p => p.name === selectedPlanName) || availablePlans[0];
  
  const basePrice = selectedPlanData.price;
  const discountPercentage = selectedPlanData.discount ? parseFloat(String(selectedPlanData.discount).replace('%', '')) : 0;
  const discountAmount = (basePrice * discountPercentage) / 100;
  const finalPrice = basePrice - discountAmount;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href={`/specialist/${specialist.id}`} className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Voltar</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <PawPrint className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">ExoticCare</span>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Checkout Form */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Finalizar Contratação</h1>
              <p className="text-muted-foreground">Contratando os serviços de <span className="font-semibold text-primary">{specialist.name}</span></p>
            </div>

            {/* Animal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PawPrint className="h-5 w-5" />
                  Informações do Animal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="animal-type">Tipo de Animal</Label>
                    <Input id="animal-type" placeholder="Ex: Iguana Verde" />
                  </div>
                  <div>
                    <Label htmlFor="animal-age">Idade</Label>
                    <Input id="animal-age" placeholder="Ex: 3 anos" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="special-needs">Necessidades Especiais</Label>
                  <Input id="special-needs" placeholder="Medicamentos, dieta especial, etc." />
                </div>
                <div>
                  <Label htmlFor="address">Endereço para Visita</Label>
                  <Input id="address" placeholder="Rua, número, bairro, cidade" />
                </div>
              </CardContent>
            </Card>

            {/* Plan Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Escolha o Plano ou Serviço</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPlanName} onValueChange={setSelectedPlanName}>
                  {availablePlans.map((plan) => (
                    <div key={plan.name} className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value={plan.name} id={plan.name} />
                      <div className="flex-1">
                        <Label htmlFor={plan.name} className="font-medium cursor-pointer">
                          {plan.name}
                        </Label>
                        <div className="text-sm text-muted-foreground">
                          {plan.description}
                          {plan.discount > 0 && (
                            <Badge variant="secondary" className="ml-2">
                              {plan.discount}% de desconto
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Agendamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Data da Primeira Visita</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="time">Horário Preferido</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="flexible" />
                  <Label htmlFor="flexible" className="text-sm">
                    Tenho flexibilidade de horário
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Forma de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="font-medium cursor-pointer">
                      Cartão de Crédito
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="font-medium cursor-pointer">
                      PIX
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "credit" && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="card-number">Número do Cartão</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Validade</Label>
                        <Input id="expiry" placeholder="MM/AA" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="card-name">Nome no Cartão</Label>
                      <Input id="card-name" placeholder="Nome completo" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Specialist Info */}
            <Card>
              <CardHeader>
                <CardTitle>Especialista Selecionado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={specialist.image || "/placeholder.svg"} alt={specialist.name} />
                    <AvatarFallback>{specialist.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{specialist.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{specialist.rating}</span>
                      <span className="text-muted-foreground text-sm">({specialist.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      {specialist.location}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {specialist.specialties.map((specialty, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{selectedPlanData.name}</span>
                  <span>R$ {basePrice.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto ({discountPercentage}%)</span>
                    <span>-R$ {discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Taxa de serviço</span>
                  <span>R$ 15,00</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>R$ {(finalPrice + 15).toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Pagamento Seguro</h4>
                    <p className="text-sm text-muted-foreground">
                      Seu pagamento fica retido com segurança e só é liberado para o especialista 3 dias após a
                      confirmação do serviço.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Checkout Button */}
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
              <CheckCircle className="h-5 w-5 mr-2" />
              Confirmar Contratação
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Ao confirmar, você concorda com nossos{" "}
              <Link href="#" className="underline">
                Termos de Uso
              </Link>{" "}
              e{" "}
              <Link href="#" className="underline">
                Política de Privacidade
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
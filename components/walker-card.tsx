import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Clock, Heart } from "lucide-react"
import Link from "next/link"

interface WalkerCardProps {
  walker: {
    id: string
    name: string
    rating: number
    reviews: number
    price: string
    location: string
    experience: string
    image: string
    badges: string[]
    description?: string
  }
}

export function WalkerCard({ walker }: WalkerCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-16 w-16 ring-2 ring-primary/10 group-hover:ring-primary/20 transition-all">
            <AvatarImage src={walker.image || "/placeholder.svg"} alt={walker.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {walker.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">{walker.name}</CardTitle>
            <div className="flex items-center gap-1 mb-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{walker.rating}</span>
              <span className="text-muted-foreground text-sm">({walker.reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {walker.location}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500 transition-colors">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {walker.badges.map((badge, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {badge}
            </Badge>
          ))}
        </div>

        {walker.description && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{walker.description}</p>}

        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-lg text-primary">
              {walker.price}
              <span className="text-sm font-normal text-muted-foreground">/passeio</span>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {walker.experience} de experiência
            </div>
          </div>
          <Link href={`/walker/${walker.id}`}>
            <Button size="sm" className="bg-primary hover:bg-primary/90 group-hover:shadow-md transition-all">
              Ver Perfil
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

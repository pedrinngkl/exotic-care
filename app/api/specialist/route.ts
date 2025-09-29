// Em app/api/specialists/[id]/route.ts
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  try {
    const specialist = await prisma.specialists.findUnique({
      where: {
        id: parseInt(id), // Converte o ID da URL para número
      },
    })

    if (!specialist) {
      return new NextResponse('Especialista não encontrado', { status: 404 })
    }

    return NextResponse.json(specialist)
  } catch (error) {
    console.error("Erro ao buscar especialista:", error)
    return new NextResponse('Erro ao buscar dados do banco.', { status: 500 })
  }
}
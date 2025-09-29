// Em app/api/specialists/route.ts
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const specialists = await prisma.specialists.findMany();
    return NextResponse.json(specialists);
  } catch (error) {
    console.error("Erro ao buscar especialistas:", error);
    return new NextResponse('Erro ao buscar dados do banco.', { status: 500 });
  }
}
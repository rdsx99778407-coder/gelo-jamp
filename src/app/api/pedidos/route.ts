import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const orderSchema = z.object({
  customerName: z.string().min(1, "Nome é obrigatório"),
  customerPhone: z.string().optional(),
  productName: z.string().optional(),
  productId: z.string().optional(),
  message: z.string().optional(),
  status: z.string().optional().default("NOVO"),
});

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ error: "Erro ao buscar pedidos" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = orderSchema.parse(body);
    const order = await prisma.order.create({ data });
    return NextResponse.json({ order }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro ao criar pedido" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
    }

    const body = await req.json();
    const order = await prisma.order.update({ where: { id }, data: body });
    return NextResponse.json({ order });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro ao atualizar pedido" }, { status: 400 });
  }
}
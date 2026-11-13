import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  weight: z.string().optional(),
  price: z.string().optional().transform((val) => (val ? parseFloat(val) : null)),
  image: z.string().optional(),
  categoryId: z.string().optional(),
  active: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = productSchema.parse(body);
    const product = await prisma.product.create({ data });
    return NextResponse.json({ product });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro ao criar produto" }, { status: 400 });
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
    const data = productSchema.partial().parse(body);
    const product = await prisma.product.update({ where: { id }, data });
    return NextResponse.json({ product });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro ao atualizar produto" }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
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
    const product = await prisma.product.update({
      where: { id },
      data: { active: body.active },
    });
    return NextResponse.json({ product });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro ao atualizar status" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
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

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro ao excluir produto" }, { status: 400 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const gallerySchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  image: z.string().min(1, "URL da imagem é obrigatória"),
  category: z.string().optional(),
  active: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ error: "Erro ao buscar galeria" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = gallerySchema.parse(body);
    const image = await prisma.galleryImage.create({ data });
    return NextResponse.json({ image });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro ao criar imagem" }, { status: 400 });
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
    const data = gallerySchema.partial().parse(body);
    const image = await prisma.galleryImage.update({ where: { id }, data });
    return NextResponse.json({ image });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro ao atualizar imagem" }, { status: 400 });
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
    const image = await prisma.galleryImage.update({
      where: { id },
      data: { active: body.active },
    });
    return NextResponse.json({ image });
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

    await prisma.galleryImage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro ao excluir imagem" }, { status: 400 });
  }
}
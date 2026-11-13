import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const settingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
});

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ error: "Erro ao buscar configurações" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = settingSchema.parse(body);

    const setting = await prisma.setting.upsert({
      where: { key: data.key },
      update: { value: data.value },
      create: { key: data.key, value: data.value },
    });

    return NextResponse.json({ setting });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro ao salvar configuração" }, { status: 400 });
  }
}
import { prisma } from "../src/lib/prisma";

const excluidos = await prisma.order.deleteMany({
  where: { customerName: { contains: "Teste" } },
});
console.log(`Pedidos de teste removidos: ${excluidos.count}`);
await prisma.$disconnect();

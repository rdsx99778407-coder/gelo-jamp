import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const [productsCount, ordersCount, galleryCount, recentOrders] =
    await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.galleryImage.count(),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-brand-dark mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Bem-vindo de volta, {session?.user?.name}
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <StatCard title="Produtos Cadastrados" value={productsCount} icon="📦" color="bg-blue-50 text-blue-600" />
        <StatCard title="Pedidos Registrados" value={ordersCount} icon="📋" color="bg-green-50 text-green-600" />
        <StatCard title="Fotos na Galeria" value={galleryCount} icon="🖼️" color="bg-purple-50 text-purple-600" />
        <StatCard title="WhatsApp Oficial" value="+55 33 98704-6287" icon="💬" color="bg-emerald-50 text-emerald-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-brand-dark mb-6">Pedidos Recentes</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th className="pb-3 font-medium">Cliente</th>
                    <th className="pb-3 font-medium">Produto</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length === 0 ? (
                    <tr>
                      <td className="py-4 text-center text-gray-500" colSpan={4}>
                        Nenhum pedido registrado ainda.
                      </td>
                    </tr>
                  ) : (
                    recentOrders.map((order: any) => (
                      <tr key={order.id} className="border-b border-gray-200/50">
                        <td className="py-3">{order.customerName}</td>
                        <td className="py-3">{order.productName || "-"}</td>
                        <td className="py-3">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-bold text-brand-dark mb-6">Informações da Empresa</h3>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Nome</span>
              <span className="font-medium text-brand-dark">Gelo Jamp</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Cidade</span>
              <span className="font-medium text-brand-dark">Jampruca - MG</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">WhatsApp</span>
              <span className="font-medium text-blue-600">+55 33 98704-6287</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Instagram</span>
              <span className="font-medium text-blue-600">gelo.jamp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number | string;
  icon: string;
  color: string;
}) {
  return (
    <div className={`${color} rounded-2xl p-6 shadow-sm`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
    </div>
  );
}
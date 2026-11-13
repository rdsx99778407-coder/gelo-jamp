import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPedidosPage() {
  const session = await getServerSession(authOptions);

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">Pedidos</h1>
          <p className="text-gray-600 text-sm">
            Acompanhe os pedidos realizados através do sistema.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-xs font-medium text-gray-500">ID</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500">Cliente</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500">Telefone</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500">Produto</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 text-center">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500">Data</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center text-gray-500" colSpan={6}>
                    Nenhum pedido registrado ainda.
                  </td>
                </tr>
              ) : (
                orders.map((order: any) => (
                  <tr key={order.id} className="border-b border-gray-200/50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">
                      {order.id.slice(0, 8)}...
                    </td>
                    <td className="px-4 py-3 font-medium text-brand-dark">
                      {order.customerName}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {order.customerPhone || "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {order.productName || "-"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "NOVO"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "CONFIRMADO"
                          ? "bg-green-100 text-green-700"
                          : order.status === "ENTREGUE"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(order.createdAt).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
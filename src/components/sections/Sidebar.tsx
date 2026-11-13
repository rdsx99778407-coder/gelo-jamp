"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Image,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const ADMIN_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Produtos", href: "/admin/produtos", icon: Package },
  { name: "Galeria", href: "/admin/galeria", icon: Image },
  { name: "Pedidos", href: "/admin/pedidos", icon: FileText },
  { name: "Configurações", href: "/admin/configuracoes", icon: Settings },
];

export function Sidebar({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:w-64 flex-col border-r border-border bg-white">
      <div className="p-6">
        <Link href="/admin/dashboard" className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-200/50">
            <span className="text-white font-bold text-lg">GJ</span>
          </div>
          <span className="font-bold text-lg text-[#0F1C2E] tracking-tight">
            Gelo Jamp
          </span>
        </Link>

        <nav className="space-y-1">
          {ADMIN_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
                <ChevronRight className="w-3 h-3 text-gray-400 ml-auto" />
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <span className="text-xs font-bold">{user?.name?.charAt(0) || "A"}</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#0F1C2E]">
              {user?.name || "Administrador"}
            </p>
            <p className="text-xs text-gray-500">{user?.email || ""}</p>
          </div>
        </div>
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.href = "/api/auth/signout";
            }
          }}
          className="w-full flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
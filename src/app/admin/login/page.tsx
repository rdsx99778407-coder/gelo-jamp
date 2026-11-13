"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Phone } from "lucide-react";

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a6 6 0 0112 0v3a6 6 0 01-12 0V9zM3 12a2 2 0 012-2h14a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5z" />
    </svg>
  );
}

const DARK_BLUE = "text-[#0F1C2E]";
const DARK_BLUE_BG = "bg-[#0F1C2E]";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou senha inválidos");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch {
      setError("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200/50">
            <span className="text-white font-bold text-xl">GJ</span>
          </div>
          <h2 className={`text-2xl font-bold ${DARK_BLUE}`}>Gelo Jamp</h2>
          <p className="text-gray-600 text-sm">Painel Administrativo</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-border p-8">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="admin@gelojamp.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-10 ${DARK_BLUE_BG} text-white rounded-lg font-medium disabled:opacity-60 transition-colors hover:bg-[#142846]`}
            >
              {loading ? "Entrando..." : "Entrar no Painel"}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border"></span>
            </div>
            <span className="relative text-xs font-medium text-gray-500 bg-gray-50 px-2">
              Ou continue com
            </span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <a
              href="https://wa.me/5533987046287"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/gelo.jamp/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center text-white hover:opacity-90 transition-colors"
            >
              <CameraIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 mt-6">
          Distribuidora de Gelo - Jampruca - MG
        </p>
      </div>
    </div>
  );
}
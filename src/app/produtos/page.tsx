"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description?: string | null;
  weight?: string | null;
  price?: number | null;
  image?: string | null;
  active: boolean;
}

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/produtos")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const whatsappMessage = (name: string) =>
    `Olá! Gostaria de fazer um pedido de ${name} na Gelo Jamp.`;

  if (loading) {
    return (
      <div className="container px-4 py-20 mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-blue-50/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">
            Catálogo de Produtos
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conheça nossos produtos de gelo. Faça seu pedido diretamente pelo WhatsApp.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">
              Nenhum produto cadastrado
            </h3>
            <p className="text-gray-600">
              O administrador ainda não cadastrou produtos.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.active)
              .map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="h-64 relative overflow-hidden bg-gray-100">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-6xl">
                        ❄️
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-dark border border-blue-100">
                      Disponível
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-brand-dark mb-1">
                      {product.name}
                    </h3>
                    {product.weight && (
                      <p className="text-sm text-gray-500 mb-3">
                        {product.weight}
                      </p>
                    )}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description || "Descrição não disponível."}
                    </p>
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-bold text-blue-600">
                        {product.price
                          ? `R$ ${product.price.toFixed(2)}`
                          : "Consulte preço"}
                      </span>
                      <a
                        href={`https://wa.me/5533987046287?text=${encodeURIComponent(whatsappMessage(product.name))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto bg-brand-dark text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#142846] transition-colors text-center"
                      >
                        Pedir pelo WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
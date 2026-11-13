"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Product {
  id: string;
  name: string;
  description?: string | null;
  weight?: string | null;
  price?: number | null;
  image?: string | null;
  active: boolean;
  featured: boolean;
}

export default function AdminProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    weight: "",
    price: "",
    image: "",
    active: true,
    featured: false,
  });
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/produtos");
      const data = await res.json();
      setProducts(data.products || []);
    } catch {
      setError("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openCreate = () => {
    setEditingId(null);
    setFormData({ name: "", description: "", weight: "", price: "", image: "", active: true, featured: false });
    setError("");
    setOpenModal(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      weight: product.weight || "",
      price: product.price ? String(product.price) : "",
      image: product.image || "",
      active: product.active,
      featured: product.featured,
    });
    setError("");
    setOpenModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/produtos?id=${editingId}` : "/api/produtos";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: formData.price ? parseFloat(formData.price) : null,
        }),
      });
      if (!res.ok) throw new Error("Erro ao salvar produto");
      setOpenModal(false);
      fetchProducts();
    } catch {
      setError("Erro ao salvar produto. Tente novamente.");
    }
  };

  const toggleProduct = async (id: string, active: boolean) => {
    try {
      const res = await fetch(`/api/produtos?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active }),
      });
      if (!res.ok) throw new Error("Erro ao atualizar produto");
      fetchProducts();
    } catch {
      setError("Erro ao atualizar status do produto");
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      const res = await fetch(`/api/produtos?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir produto");
      fetchProducts();
    } catch {
      setError("Erro ao excluir produto");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">Gerenciar Produtos</h1>
          <p className="text-gray-600 text-sm">
            Cadastre, edite e organize os produtos da Gelo Jamp.
          </p>
        </div>
        <Button variant="ice" onClick={openCreate}>
          <Plus className="w-4 h-4 mr-2" /> Novo Produto
        </Button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-xs font-medium text-gray-500">Foto</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500">Nome</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500">Peso</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500">Preço</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 text-center">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center text-gray-500" colSpan={6}>
                    Nenhum produto cadastrado.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-200/50 hover:bg-gray-50">
                    <td className="px-4 py-4">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 font-medium text-brand-dark">
                      {product.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {product.weight || "-"}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {product.price
                        ? `R$ ${product.price.toFixed(2)}`
                        : <span className="text-gray-400">-</span>}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {product.active ? (
                        <span className="w-5 h-5 text-green-500 cursor-pointer hover:text-green-600" onClick={(e) => { e.stopPropagation(); toggleProduct(product.id, false); }}>
                          ✓
                        </span>
                      ) : (
                        <span className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" onClick={(e) => { e.stopPropagation(); toggleProduct(product.id, true); }}>
                          ○
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Button variant="ghost" size="small" onClick={(e) => { e.stopPropagation(); openEdit(product); }} className="text-blue-600 hover:bg-blue-50">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="destructive" size="small" onClick={(e) => { e.stopPropagation(); deleteProduct(product.id); }} className="text-rose-500 hover:bg-rose-50">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" onClick={() => setOpenModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-brand-dark mb-6">
              {editingId ? "Editar Produto" : "Novo Produto"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Gelo em Cubos 5kg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrição do produto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Peso / Quantidade</label>
                <Input
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="Ex: 5 kg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0,00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="active"
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="active" className="text-sm text-gray-700">Produto ativo</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="featured"
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">Produto em destaque</label>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setOpenModal(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="ice">
                  {editingId ? "Atualizar" : "Cadastrar"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
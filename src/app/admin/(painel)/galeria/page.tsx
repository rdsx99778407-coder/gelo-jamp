"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface GalleryImage {
  id: string;
  title: string;
  image: string;
  category?: string | null;
  active: boolean;
}

export default function AdminGaleriaPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", image: "", category: "geral", active: true });
  const [error, setError] = useState("");

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/galeria");
      const data = await res.json();
      setImages(data.images || []);
    } catch {
      setError("Erro ao carregar galeria");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setFormData({ title: "", image: "", category: "geral", active: true });
    setError("");
    setOpenModal(true);
  };

  const openEdit = (img: GalleryImage) => {
    setEditingId(img.id);
    setFormData({ title: img.title || "", image: img.image || "", category: img.category || "geral", active: img.active });
    setError("");
    setOpenModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/galeria?id=${editingId}` : "/api/galeria";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Erro ao salvar imagem");
      setOpenModal(false);
      fetchImages();
    } catch {
      setError("Erro ao salvar imagem. Tente novamente.");
    }
  };

  const toggleImage = async (id: string, active: boolean) => {
    try {
      const res = await fetch(`/api/galeria?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active }),
      });
      if (!res.ok) throw new Error("Erro ao atualizar");
      fetchImages();
    } catch {
      setError("Erro ao atualizar status da imagem");
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm("Excluir esta foto?")) return;
    try {
      const res = await fetch(`/api/galeria?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");
      fetchImages();
    } catch {
      setError("Erro ao excluir imagem");
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
          <h1 className="text-2xl font-bold text-brand-dark">Gerenciar Galeria</h1>
          <p className="text-gray-600 text-sm">
            Adicione, edite e organize as fotos da Gelo Jamp.
          </p>
        </div>
        <Button variant="ice" onClick={openCreate}>
          <Plus className="w-4 h-4 mr-2" /> Nova Foto
        </Button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-4 grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Nenhuma foto cadastrada</p>
            </div>
          ) : (
            images.map((img) => (
              <div key={img.id} className="relative group">
                <img
                  src={img.image}
                  alt={img.title}
                  className="w-full h-48 object-cover rounded-xl border border-gray-200 group-hover:border-blue-300 transition-colors"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <div className="flex space-y-2">
                    <Button variant="ghost" size="small" onClick={(e) => { e.stopPropagation(); openEdit(img); }} className="text-white bg-blue-600/90 hover:bg-blue-600">
                      <ImageIcon className="w-3 h-3" />
                    </Button>
                    <Button variant="destructive" size="small" onClick={(e) => { e.stopPropagation(); deleteImage(img.id); }} className="text-white bg-rose-600/90 hover:bg-rose-600">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-white">{img.active ? "Ativo" : "Inativo"}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleImage(img.id, !img.active); }}
                      className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white transition-colors"
                    >
                      {img.active ? "✓" : "○"}
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white truncate max-w-[150px]">
                  {img.title}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" onClick={() => setOpenModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-brand-dark mb-6">
              {editingId ? "Editar Foto" : "Nova Foto"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Entrega de gelo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://exemplo.com/foto.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Ex: produtos, entregas, estrutura"
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
                <label htmlFor="active" className="text-sm text-gray-700">Imagem ativa</label>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setOpenModal(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="ice">
                  {editingId ? "Atualizar" : "Adicionar"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

interface GalleryImage {
  id: string;
  title: string;
  image: string;
  category?: string | null;
  active: boolean;
}

export default function GaleriaPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [openImage, setOpenImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetch("/api/galeria")
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container px-4 py-20 mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const activeImages = images.filter((img) => img.active);

  return (
    <div className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">
            Galeria de Fotos
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Produtos, entregas, estrutura e momentos da Gelo Jamp.
          </p>
        </div>

        {activeImages.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🖼️</div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">
              Nenhuma foto cadastrada
            </h3>
            <p className="text-gray-600">
              O administrador ainda não adicionou fotos à galeria.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {activeImages.map((img) => (
              <div
                key={img.id}
                className="relative group overflow-hidden rounded-xl border border-gray-200 aspect-[4/5] bg-gray-100 cursor-pointer"
                onClick={() => setOpenImage(img)}
              >
                <img
                  src={img.image}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 px-4 py-2 rounded-lg text-brand-dark font-semibold text-sm shadow-lg">
                    Ver foto: {img.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Modal */}
        {openImage && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setOpenImage(null)}>
            <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setOpenImage(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                ✕
              </button>
              <img src={openImage.image} alt={openImage.title} className="w-full h-auto max-h-[60vh] object-contain rounded-xl" />
              <h3 className="mt-4 text-center text-xl font-bold text-brand-dark">{openImage.title}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
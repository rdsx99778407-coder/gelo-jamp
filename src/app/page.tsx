import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Atendendo Jampruca e região
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-brand-dark">
                Qualidade e frescor<br />
                <span className="text-blue-600">para seus melhores momentos!</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Levamos qualidade e praticidade até você. Conheça nossos
                produtos e faça seu pedido pelo WhatsApp oficial da Gelo Jamp.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="ice" size="large" className="w-full sm:w-auto">
                  <a
                    href="https://wa.me/5533987046287"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    FAÇA SEU PEDIDO
                  </a>
                </Button>
                <Button variant="outline" size="large" className="w-full sm:w-auto">
                  <Link href="/produtos">Ver Catálogo</Link>
                </Button>
              </div>
            </div>

            <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-50/50"></div>
              <div className="relative z-10 animate-float">
                <div className="relative h-full w-full rounded-2xl shadow-2xl shadow-blue-200/60 border-4 border-white overflow-hidden ice-gradient">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 via-transparent to-blue-200 opacity-80 animate-[ice-shimmer_4s_ease-in-out_infinite]"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-6xl font-bold opacity-60 select-none">
                    ❄️
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <span className="text-white font-bold text-xl bg-black/40 inline-block px-4 py-1 rounded-lg backdrop-blur-sm">
                      Gelo Jamp - Qualidade e Frescor
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg border border-blue-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">WhatsApp oficial</p>
                      <p className="font-bold text-brand-dark">
                        +55 33 98704-6287
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 bg-blue-50/30 border-y border-gray-200/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">
              Por que escolher a Gelo Jamp?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Compromisso com a qualidade, frescor e agilidade em cada entrega.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Qualidade Garantida",
                desc: "Gelo produzido com água potável e filtrada, seguro para consumo humano.",
              },
              {
                title: "Entrega Ágil",
                desc: "Atendemos Jampruca e região com rapidez e pontualidade.",
              },
              {
                title: "Atendimento Direto",
                desc: "Fale conosco pelo WhatsApp oficial e faça seu pedido em segundos.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  ❄️
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-brand-dark mb-2">
                Produtos em Destaque
              </h2>
              <p className="text-gray-600">Conheça nossos principais produtos de gelo.</p>
            </div>
            <Link href="/produtos" className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <ProductCard key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="py-20 bg-brand-dark">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Siga a Gelo Jamp no Instagram
            </h2>
            <p className="text-blue-200">Acompanhe nossas novidades e entregas.</p>
          </div>
          <div className="flex justify-center">
            <a
              href="https://www.instagram.com/gelo.jamp/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-white/10 border border-white/20 rounded-2xl px-8 py-4 text-white hover:bg-white/20 transition-all group"
            >
              <CameraIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span className="font-medium">Visitar Instagram</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Região de Atendimento */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 text-white shadow-xl">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Onde estamos?</h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Estamos localizados em{" "}
                  <strong className="text-white">Jampruca - MG</strong> e
                  atendemos Jampruca e região.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
              </div>
              <div>
                <a
                  href="https://wa.me/5533987046287"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold text-center hover:bg-blue-50 transition-colors"
                >
                  Consultar Entrega pelo WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
      <div className="relative h-48 overflow-hidden bg-blue-50">
        <div className="absolute inset-0 flex items-center justify-center text-blue-200 text-6xl">
          ❄️
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-brand-dark mb-1">Gelo em Cubos</h3>
        <p className="text-gray-500 text-sm mb-4">Saco de 5 kg</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-brand-dark">Consulte preço</span>
          <Button variant="ice" size="small">
            <a
              href="https://wa.me/5533987046287?text=Olá! Gostaria de fazer um pedido de Gelo em Cubos na Gelo Jamp."
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

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
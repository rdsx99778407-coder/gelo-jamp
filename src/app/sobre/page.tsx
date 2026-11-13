import Link from "next/link";
import { MapPin, Clock, Truck, CheckCircle, Phone } from "lucide-react";

export default function SobrePage() {
  return (
    <div className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">
            Sobre a Gelo Jamp
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conheça nossa distribuidora de gelo em Jampruca - MG.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div className="space-y-8">
            <div className="bg-brand-dark rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
              <h2 className="text-3xl font-bold mb-4">Quem somos</h2>
              <p className="text-blue-100 leading-relaxed">
                A Gelo Jamp é uma distribuidora de gelo localizada em{" "}
                <strong>Jampruca - MG</strong>, comprometida em levar qualidade
                e frescor para seus melhores momentos.
              </p>
              <p className="mt-4 text-blue-200 text-sm">
                Trabalhamos com gelo para consumo humano, produzido com água
                potável e filtrada, seguindo os mais altos padrões de qualidade.
              </p>
            </div>

            <div className="space-y-6">
              <InfoCard icon={<CheckCircle className="w-5 h-5" />}>
                <h3 className="font-bold text-brand-dark">
                  Compromisso com a Qualidade
                </h3>
                <p className="text-gray-600 text-sm">
                  Nosso gelo é produzido com água potável, duplamente filtrada,
                  garantindo segurança e pureza para consumo humano.
                </p>
              </InfoCard>
              <InfoCard icon={<Truck className="w-5 h-5" />}>
                <h3 className="font-bold text-brand-dark">Entregas na Região</h3>
                <p className="text-gray-600 text-sm">
                  Atendemos Jampruca e região com agilidade e pontualidade,
                  garantindo que seu gelo chegue sempre no prazo.
                </p>
              </InfoCard>
              <InfoCard icon={<Clock className="w-5 h-5" />}>
                <h3 className="font-bold text-brand-dark">
                  Atendimento Dedicado
                </h3>
                <p className="text-gray-600 text-sm">
                  Nosso time está pronto para atender você pelo WhatsApp
                  oficial, com atendimento rápido e personalizado.
                </p>
              </InfoCard>
            </div>
          </div>

          <div className="hidden lg:block bg-blue-50 rounded-3xl p-8 border border-blue-100">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark">Localização</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Jampruca - MG<br />
              Atendimento: Jampruca e região
            </p>
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-gray-600 text-sm">
                Seg a Sex: 08h às 18h • Sábado: 08h às 12h
              </span>
            </div>
            <a
              href="https://wa.me/5533987046287"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-dark text-white px-6 py-3 rounded-xl font-medium hover:bg-[#142846] transition-colors"
            >
              Falar pelo WhatsApp
            </a>
          </div>
        </div>

        <div className="bg-brand-dark rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para refrescar seus momentos?
          </h2>
          <p className="text-blue-200 mb-8 max-w-lg">
            Entre em contato pelo WhatsApp oficial e faça seu pedido hoje mesmo.
          </p>
          <a
            href="https://wa.me/5533987046287?text=Olá! Gostaria de saber mais sobre os produtos da Gelo Jamp."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors"
          >
            FAÇA SEU PEDIDO PELO WHATSAPP
          </a>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all">
      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
        {icon}
      </div>
      {children}
    </div>
  );
}
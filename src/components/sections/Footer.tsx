import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

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

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white border-t border-blue-900/30 mt-auto">
      <div className="container px-4 py-12 mx-auto">
        <div className="md:grid md:grid-cols-3 md:gap-12 mb-12">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-200/50">
                <span className="text-white font-bold text-sm">GJ</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Gelo Jamp</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed max-w-xs">
              Distribuidora de gelo em Jampruca - MG. Qualidade, frescor e
              agilidade para seus melhores momentos.
            </p>
            <div className="flex space-y-2 mt-6">
              <a
                href="https://www.instagram.com/gelo.jamp/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors"
              >
                <CameraIcon />
                <span className="text-sm">gelo.jamp</span>
              </a>
              <a
                href="https://wa.me/5533987046287"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+55 33 98704-6287</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Informações</h3>
            <ul className="space-y-4 text-blue-200 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Jampruca - MG e região</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Seg a Sex: 08h às 18h</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Sábado: 08h às 12h</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Atendimento</h3>
            <p className="text-blue-200 text-sm mb-6">
              Faça seu pedido ou tire dúvidas pelo WhatsApp oficial:
            </p>
            <a
              href="https://wa.me/5533987046287"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors text-center w-full md:w-auto"
            >
              +55 33 98704-6287
            </a>
            <div className="mt-6 flex space-x-4">
              <a
                href="https://www.instagram.com/gelo.jamp/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <CameraIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-900/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-blue-400 text-sm">
            © 2026 Gelo Jamp. Todos os direitos reservados.
          </p>
          <p className="text-blue-400 text-sm">
            Desenvolvido com foco em Jampruca - MG
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
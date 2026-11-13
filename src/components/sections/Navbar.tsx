"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";

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

const NAV_LINKS = [
  { name: "Início", href: "/" },
  { name: "Produtos", href: "/produtos" },
  { name: "Galeria", href: "/galeria" },
  { name: "Sobre", href: "/sobre" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <nav
        className={cn(
          "fixed w-full z-50 border-b border-border bg-background/80 backdrop-blur-md",
          pathname === "/" ? "" : "shadow-sm"
        )}
      >
        <div className="container flex items-center justify-between h-20 px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-200/50">
              <span className="text-white font-bold text-lg tracking-wider drop-shadow">GJ</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-brand-dark">
              Gelo Jamp
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600",
                  pathname === link.href
                    ? "text-blue-600"
                    : "text-brand-dark/80"
                )}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://wa.me/5533987046287"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm font-medium text-brand-dark hover:text-blue-600 transition-colors"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://www.instagram.com/gelo.jamp/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-brand-dark/70 hover:text-blue-600 transition-colors"
            >
              <CameraIcon className="w-5 h-5" />
            </a>
            <Button size="large" className="hidden md:inline">
              <Link href="/produtos">Ver Produtos</Link>
            </Button>
            <Button
              variant="ice"
              size="large"
              onClick={() => setIsOpen(true)}
              className="hidden md:inline"
            >
              <Phone className="w-4 h-4 mr-2" /> Pedido
            </Button>
            <Button variant="ghost" size="small" className="md:hidden" onClick={() => setIsOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={cn(
              "fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white border-l border-border/50 p-6 shadow-2xl transform transition-transform duration-300 translate-x-full",
              isOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="flex justify-between items-center mb-8">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold text-xl text-brand-dark">Gelo Jamp</span>
              </Link>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col space-y-4 mb-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-lg font-medium rounded-lg hover:bg-blue-50 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="space-y-4">
              <a
                href="https://wa.me/5533987046287"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-4 py-3 bg-blue-50 rounded-xl text-blue-700 font-medium hover:bg-blue-100 transition-colors"
              >
                <Phone className="w-5 h-5" /> WhatsApp
              </a>
              <a
                href="https://www.instagram.com/gelo.jamp/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-4 py-3 text-brand-dark hover:bg-blue-50 rounded-xl transition-colors"
              >
                <CameraIcon className="w-5 h-5" /> Instagram
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
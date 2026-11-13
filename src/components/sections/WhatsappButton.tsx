"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

export function WhatsappButton() {
  const whatsappUrl = "https://wa.me/5533987046287";

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-50 flex items-center space-x-3 bg-green-500 text-white px-5 py-3 rounded-full shadow-2xl shadow-green-200/50 hover:bg-green-600 transition-all transform hover:scale-105 animate-float"
    >
      <Phone className="w-5 h-5" />
      <span className="font-semibold text-sm hidden sm:block">WhatsApp</span>
    </Link>
  );
}
"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, Building2 } from "lucide-react";

function CameraIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a6 6 0 0112 0v3a6 6 0 01-12 0V9zM3 12a2 2 0 012-2h14a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5z" />
    </svg>
  );
}

interface Setting {
  key: string;
  value: string;
  label: string;
  icon: React.ElementType;
  type: "text" | "url";
}

const SETTINGS: Setting[] = [
  {
    key: "company_name",
    label: "Nome da Empresa",
    value: "",
    icon: Building2,
    type: "text",
  },
  {
    key: "company_city",
    label: "Cidade / Região",
    value: "",
    icon: MapPin,
    type: "text",
  },
  {
    key: "company_whatsapp",
    label: "WhatsApp Oficial",
    value: "",
    icon: Phone,
    type: "text",
  },
  {
    key: "whatsapp_link",
    label: "Link do WhatsApp",
    value: "",
    icon: Phone,
    type: "url",
  },
  {
    key: "instagram_url",
    label: "Instagram",
    value: "",
    icon: CameraIcon,
    type: "url",
  },
];

export default function AdminConfiguracoesPage() {
  const [settings, setSettings] = useState<Setting[]>(SETTINGS);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/configuracoes")
      .then((res) => res.json())
      .then((data) => {
        const map: Record<string, string> = {};
        (data.settings || []).forEach((s: { key: string; value: string }) => {
          map[s.key] = s.value;
        });
        setValues(map);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      for (const setting of settings) {
        await fetch("/api/configuracoes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: setting.key, value: values[setting.key] || "" }),
        });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert("Erro ao salvar configurações");
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
      <div>
        <h1 className="text-2xl font-bold text-brand-dark">Configurações da Empresa</h1>
        <p className="text-gray-600 text-sm">
          Edite as informações institucionais da Gelo Jamp.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-border shadow-sm p-6 max-w-2xl space-y-6">
        {settings.map((setting) => (
          <div key={setting.key} className="space-y-2">
            <div className="flex items-center space-x-3">
              <setting.icon className="w-5 h-5 text-blue-600" />
              <label className="text-sm font-medium text-gray-700">
                {setting.label}
              </label>
            </div>
            <Input
              value={values[setting.key] || ""}
              onChange={(e) =>
                setValues({ ...values, [setting.key]: e.target.value })
              }
              placeholder=""
            />
          </div>
        ))}
        <div className="pt-4">
          <Button variant="ice" type="submit">
            Salvar Alterações
          </Button>
          {saved && (
            <span className="ml-3 text-xs text-green-600 font-medium">Salvo!</span>
          )}
        </div>
      </form>
    </div>
  );
}
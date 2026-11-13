# GELO JAMP — Distribuidora de Gelo

Site institucional, catálogo comercial e sistema administrativo completo para a Gelo Jamp — Distribuidora de Gelo, localizada em Jampruca - MG.

## 📋 Visão Geral

Plataforma web completa com:
- **Site público**: Página inicial, catálogo de produtos, galeria de fotos, página sobre a empresa
- **Sistema administrativo**: Painel protegido por login para gerenciar produtos, galeria, pedidos e configurações
- **WhatsApp**: Integração completa com o número oficial +55 33 98704-6287
- **Instagram**: Link direto para o perfil oficial gelo.jamp

## 🛠️ Tecnologias

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **SQLite** (via Prisma ORM)
- **NextAuth.js** (autenticação)
- **lucide-react** (ícones)
- **framer-motion** (animações)
- **bcryptjs** (hash de senhas)
- **zod** (validação)

## 📁 Estrutura do Projeto

```
gelo-jamp/
├── prisma/
│   ├── schema.prisma       # Esquema do banco de dados
│   └── seed.ts             # Seed inicial (admin + configurações)
├── src/
│   ├── app/                # Rotas do Next.js (App Router)
│   │   ├── layout.tsx      # Layout raiz (público)
│   │   ├── page.tsx        # Página inicial
│   │   ├── produtos/       # Catálogo de produtos
│   │   ├── galeria/        # Galeria de fotos
│   │   ├── sobre/          # Página institucional
│   │   ├── admin/          # Painel administrativo
│   │   │   ├── layout.tsx  # Layout admin (protegido)
│   │   │   ├── login/      # Login do admin
│   │   │   ├── dashboard/  # Dashboard com indicadores
│   │   │   ├── produtos/   # Gerenciar produtos
│   │   │   ├── galeria/    # Gerenciar fotos
│   │   │   ├── pedidos/    # Gerenciar pedidos
│   │   │   └── configuracoes/  # Configurações da empresa
│   │   ├── api/            # Rotas da API
│   │   │   ├── auth/[...nextauth]/
│   │   │   ├── produtos/
│   │   │   ├── galeria/
│   │   │   ├── pedidos/
│   │   │   └── configuracoes/
│   │   └── globals.css     # Estilos globais
│   ├── components/
│   │   ├── ui/             # Componentes base (Button, Input, Card, etc.)
│   │   └── sections/       # Seções (Navbar, Footer, WhatsAppButton, etc.)
│   ├── lib/                # Utilitários (prisma, auth)
│   ├── types/              # Tipos TypeScript
│   └── hooks/              # Hooks personalizados
├── public/
│   └── uploads/            # Imagens enviadas
├── .env.local              # Variáveis de ambiente (local)
├── .env.example            # Exemplo de variáveis
├── middleware.ts           # Middleware de proteção de rotas
├── next.config.ts          # Configuração Next.js
├── tailwind.config.ts      # Configuração Tailwind
└── README.md               # Este arquivo
```

## 🚀 Como Executar

### 1. Pré-requisitos

- Node.js 20+ instalado
- npm ou yarn

### 2. Instalar Dependências

```bash
cd gelo-jamp
npm install
```

### 3. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env.local
```

Edite o `.env.local` com suas configurações:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua-chave-secreta-gerada-com-openssl-rand-base64-32"
WHATSAPP_NUMBER="5533987046287"
WHATSAPP_LINK="https://wa.me/5533987046287"
INSTAGRAM_URL="https://www.instagram.com/gelo.jamp/"
COMPANY_NAME="Gelo Jamp"
COMPANY_CITY="Jampruca - MG"
COMPANY_WHATSAPP="+55 33 98704-6287"
```

### 4. Configurar Banco de Dados

```bash
npx prisma db push
npx tsx prisma/seed.ts
```

Isso criará o banco SQLite e cadastrará:
- **Usuário admin**: `admin@gelojamp.com` / `admin123`
- Configurações padrão da empresa

### 5. Executar em Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

Painel admin: http://localhost:3000/admin/login

### 6. Build para Produção

```bash
npm run build
npm start
```

## 🔐 Login Administrativo

- **URL**: `/admin/login`
- **Email**: `admin@gelojamp.com`
- **Senha**: `admin123`

⚠️ **Importante**: Altere a senha após o primeiro acesso.

## 📱 Funcionalidades Principais

### Site Público

| Página | Descrição |
|--------|-----------|
| `/` | Página inicial com banner, diferenciais, produtos em destaque, região de atendimento e Instagram |
| `/produtos` | Catálogo completo com botão WhatsApp para cada produto |
| `/galeria` | Galeria de fotos com modal de visualização |
| `/sobre` | Página institucional sobre a distribuidora |

### Integração WhatsApp

- Botão flutuante em todas as páginas
- Botão "FAÇA SEU PEDIDO" na página inicial
- Botão de pedido em cada produto com mensagem automática
- Contato no rodapé
- Número: `+55 33 98704-6287` (`https://wa.me/5533987046287`)

### Painel Administrativo

| Seção | Funcionalidades |
|-------|-----------------|
| Dashboard | Indicadores: produtos, pedidos, fotos, WhatsApp |
| Produtos | Cadastrar, editar, excluir, ativar/desativar, preços, fotos |
| Galeria | Adicionar, editar, excluir, organizar fotos |
| Pedidos | Consultar histórico, acompanhar status |
| Configurações | Editar textos, contatos, região, Instagram |

## ☁️ Publicação (Hospedagem)

### Vercel (Recomendado)

1. Faça push do código para um repositório GitHub
2. Conecte o repositório na [Vercel](https://vercel.com)
3. Adicione as variáveis de ambiente no painel da Vercel
4. Deploy automático

### Outras Plataformas

O projeto pode ser hospedado em qualquer plataforma que suporte Next.js:
- **Netlify**
- **Railway**
- **Render**
- **AWS Amplify**

### Docker (Opcional)

Crie um `Dockerfile` para containerização se necessário.

## 🔒 Segurança

- Rotas administrativas protegidas por middleware
- Autenticação via NextAuth.js (JWT)
- Senhas hashadas com bcrypt
- Validação de dados com Zod
- Não há credenciais expostas no código

## 📧 Contato

**Gelo Jamp — Distribuidora de Gelo**
- Cidade: Jampruca - MG
- WhatsApp: +55 33 98704-6287
- Instagram: https://www.instagram.com/gelo.jamp/

---

Desenvolvido com foco em qualidade, frescor e confiança para a Gelo Jamp.
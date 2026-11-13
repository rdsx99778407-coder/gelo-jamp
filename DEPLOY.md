# Guia de Publicação — GELO JAMP (custo zero)

Este guia publica o site da Gelo Jamp na internet **sem gastar nada**,
usando apenas planos gratuitos permanentes, sem cartão de crédito.

## Stack gratuito escolhida

| Serviço | Plano | Por quê |
|---------|-------|---------|
| **Netlify** | Free ($0, sem cartão) | Permite **uso comercial** no plano gratuito e suporta Next.js nativamente |
| **Turso** | Free ($0, sem cartão) | Banco SQLite na nuvem: 100 bancos, 5 GB, 500 mi de leituras/mês. Se estourar, apenas bloqueia — **nunca cobra** |
| **NextAuth** | Código aberto | Autenticação do painel, roda no próprio site |

> ⚠️ A Vercel foi descartada: o plano gratuito (Hobby) **proíbe uso comercial**
> nos termos de uso — risco de suspensão para um site de empresa.

## 1. Criar o banco no Turso

1. Crie a conta em **https://app.turso.tech** (pode usar login GitHub — sem cartão).
2. Em **Databases → Create database**:
   - Nome: `gelo-jamp`
   - Localização: **São Paulo (gru)** — mais perto dos clientes
3. Copie a **Database URL** (algo como `libsql://gelo-jamp-seuusuario.turso.io`).
4. Vá em **Databases → gelo-jamp → Tokens → Create token** e copie o token.

Guarde os dois valores — são as variáveis:
- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`

## 2. Preparar o banco (schema + dados iniciais)

No seu computador, dentro da pasta `gelo-jamp`, com as variáveis do passo 1:

```powershell
# gera o SQL do schema (uma vez)
npm run db:sql

# aplica o schema no banco do Turso
$env:TURSO_DATABASE_URL="libsql://SEU-BANCO.turso.io"
$env:TURSO_AUTH_TOKEN="SEU-TOKEN"
npm run db:aplicar-turso

# cadastra o usuário admin e as configurações oficiais
npx tsx prisma/seed.ts
```

O seed usa o mesmo cliente Prisma do site: com `TURSO_*` definidos ele popula
o banco remoto; sem eles, o banco local de desenvolvimento.

## 3. Publicar na Netlify

1. Crie a conta em **https://app.netlify.com** (sem cartão; plano Free
   permite uso comercial).
2. Conecte o repositório do projeto (GitHub) **ou** use a Netlify CLI:

   ```powershell
   npm install -g netlify-cli
   netlify login          # abre o navegador para autorizar
   netlify init           # cria o site
   netlify deploy --build --prod
   ```

3. Em **Site configuration → Environment variables**, cadastre:

   | Variável | Valor |
   |----------|-------|
   | `TURSO_DATABASE_URL` | `libsql://gelo-jamp-seuusuario.turso.io` |
   | `TURSO_AUTH_TOKEN` | token criado no Turso |
   | `NEXTAUTH_URL` | URL final do site, ex.: `https://gelo-jamp.netlify.app` |
   | `NEXTAUTH_SECRET` | segredo forte — gere com `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` |
   | `WHATSAPP_NUMBER` | `5533987046287` |
   | `WHATSAPP_LINK` | `https://wa.me/5533987046287` |
   | `INSTAGRAM_URL` | `https://www.instagram.com/gelo.jamp/` |
   | `COMPANY_NAME` | `Gelo Jamp` |
   | `COMPANY_CITY` | `Jampruca - MG` |
   | `COMPANY_WHATSAPP` | `+55 33 98704-6287` |

4. Faça um novo deploy (a Netlify reconstrói automaticamente após mudar
   variáveis quando conectado via Git; com CLI, rode `netlify deploy --build --prod` de novo).

O arquivo `netlify.toml` já está pronto no projeto (build do Next.js,
Node 20, cabeçalhos de segurança e noindex no painel).

## 4. HTTPS

Netlify emite certificado SSL/TLS automaticamente para
`*.netlify.app` e para domínios próprios. Nada a configurar.

## 5. Domínio próprio (opcional, futuro)

O domínio próprio é pago (~R$ 40/ano) e **não é necessário para publicar**.
Se um dia contratar, aponte o DNS para a Netlify e o SSL é emitido
gratuitamente. Sem domínio, o endereço fica:
`https://gelo-jamp.netlify.app`

## 6. Atualizar o site depois

- Com Git conectado: `git push` → a Netlify publica sozinha.
- Com CLI: `netlify deploy --build --prod`.

## 7. Segurança aplicada

- `/admin/*` protegido por middleware + verificação de sessão no layout.
- APIs de escrita (POST/PUT/DELETE) exigem sessão; somente leitura é pública.
- Senhas com hash bcrypt; sessão JWT assinada com `NEXTAUTH_SECRET`.
- O `.env.local` nunca vai para o repositório (está no `.gitignore`).
- Painel marcado com `X-Robots-Tag: noindex` (não aparece no Google).

## 8. Limites do plano gratuito (referência)

- **Netlify Free:** 300 créditos/mês (≈ 15 GB de tráfego, deploys, funções).
  Estourou? O site pausa até o mês seguinte — **nunca cobra**.
- **Turso Free:** 5 GB de banco, 500 mi de leituras e 10 mi de escritas/mês.
  Estourou? Consultas retornam erro até o mês seguinte — **nunca cobra**.

Para um site de distribuidora local, esses limites são folgados.

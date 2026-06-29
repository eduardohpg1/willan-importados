# Guia de Configuração — Willan Importados

## 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Clique em **New Project**
3. Defina nome, senha e região (prefira São Paulo)
4. Aguarde a criação do projeto

## 2. Configurar Banco de Dados

1. No painel do Supabase, vá em **SQL Editor**
2. Clique em **New Query**
3. Cole o conteúdo de `supabase/schema.sql`
4. Clique em **Run**

## 3. Criar Usuário Admin

1. No painel do Supabase, vá em **Authentication > Users**
2. Clique em **Add user > Create new user**
3. Informe o email e senha do administrador
4. Clique em **Create user**

## 4. Configurar Variáveis de Ambiente

1. No painel do Supabase, vá em **Settings > API**
2. Copie os valores:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`
3. Edite o arquivo `.env.local` com esses valores:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1...
```

## 5. Executar Localmente

```bash
cd willan-importados
npm install
npm run dev
```

Acesse: http://localhost:3000

## 6. Deploy na Vercel

1. Suba o projeto para o GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Em **Environment Variables**, adicione as 3 variáveis do `.env.local`
4. Clique em **Deploy**

## Estrutura do Projeto

```
willan-importados/
├── src/
│   ├── app/
│   │   ├── (site)/               # Site público
│   │   │   ├── layout.tsx        # Layout com header/footer
│   │   │   ├── page.tsx          # Página inicial
│   │   │   └── perfumes/[slug]/  # Página individual do perfume
│   │   └── admin/                # Área administrativa (protegida)
│   │       ├── layout.tsx        # Layout admin com sidebar
│   │       ├── page.tsx          # Dashboard
│   │       ├── login/            # Login
│   │       ├── perfumes/         # CRUD perfumes
│   │       ├── marcas/           # CRUD marcas
│   │       └── configuracoes/    # WhatsApp e configurações
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── PerfumeCard.tsx
│   │   ├── PerfumeGallery.tsx
│   │   ├── CatalogClient.tsx
│   │   └── admin/                # Componentes da área admin
│   ├── lib/
│   │   ├── actions/              # Server Actions
│   │   ├── supabase/             # Clientes Supabase
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── supabase/
│   └── schema.sql                # Script completo do banco
└── .env.local                    # Variáveis de ambiente (NÃO subir para git)
```

## Acessos

| Área | URL |
|------|-----|
| Site público | `/` |
| Catálogo | `/#catalogo` |
| Perfume individual | `/perfumes/[slug]` |
| Login admin | `/admin/login` |
| Painel admin | `/admin` |
| Gerenciar perfumes | `/admin/perfumes` |
| Gerenciar marcas | `/admin/marcas` |
| Configurações | `/admin/configuracoes` |

# 🧾 Paggo OCR

Paggo OCR é uma aplicação fullstack que permite aos usuários autenticados com conta Google fazer upload de documentos (imagens ou PDFs), realizar extração de texto via OCR, visualizar os documentos enviados e, futuramente, interagir com os dados extraídos utilizando LLMs como o GPT-4.

---

## Funcionalidades

- **Autenticação via Google** com NextAuth
- **Upload de documentos** (imagens ou PDFs)
- **Extração de texto (OCR)** com Tesseract.js (no backend)
- **Listagem dos documentos enviados**
- **Consulta com LLM** para explicação dos dados extraídos

---

## Tecnologias

### Frontend
- [Next.js 14](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [NextAuth.js](https://next-auth.js.org) com Google OAuth
- [Axios](https://axios-http.com)
- [React Hot Toast](https://react-hot-toast.com)

### Backend
- [NestJS](https://nestjs.com)
- [Prisma ORM](https://www.prisma.io/)
- [Tesseract.js](https://tesseract.projectnaptha.com/)
- [PostgreSQL](https://www.postgresql.org)

---

## Estrutura de Pastas

```
 Paggo_OCR_Case_Outline/
├── backend/               # NestJS + Prisma
│   └── src/
├── frontend/              # Next.js 14 App Router
│   └── app/
│       ├── login/
│       ├── dashboard/
│       └── api/auth/
├── docker-compose.yml
└── README.md
```

---

## 🚀 Como rodar localmente

### 1. Pré-requisitos

- Docker + Docker Compose
- Node.js >= 18
- Conta no [Google Cloud Console](https://console.cloud.google.com/) para obter o `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET`.

---

### 2. Clonar o repositório

```bash
git clone https://github.com/ErickBrth/Paggo_OCR_Case_Outline.git
cd Paggo_OCR_Case_Outline
```

---

### 3. Configurar variáveis de ambiente

#### 📦 backend/.env

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/ocrdb?schema=public
OPENAI_API_KEY=sua-chave-openai-aqui
JWT_SECRET=apenas-para-compatibilidade
```

#### 🖥 frontend/.env.local

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua-chave-secreta
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
GOOGLE_CLIENT_ID=sua-google-client-id
GOOGLE_CLIENT_SECRET=sua-google-client-secret
```

---

### 4. Rodar com Docker Compose

```bash
docker-compose up --build
```

---

### 5. Acessar a aplicação

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Banco de dados: PostgreSQL em `localhost:5432`, user: `postgres`, senha: `postgres`, db: `ocrdb`

---

## 🧪 Testando o fluxo

1. Acesse `/login` e faça login com sua conta Google
2. Vá para `/dashboard`
3. Envie um documento via formulário
4. Veja o documento listado com o texto extraído

---

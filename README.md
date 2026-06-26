# Smart Scheduler

Smart Scheduler é um mini-sistema de gestão de agendamentos de serviços desenvolvido como teste técnico. A aplicação permite criar, listar e excluir agendamentos, com validações no backend, testes automatizados, migrations SQL, lint, CI e deploy em produção.

## Demonstração

- Frontend: https://smart-scheduler-bice.vercel.app/
- API: https://smart-scheduler-api-6nzr.onrender.com
- Vídeo demonstrativo: https://youtu.be/BNyE8WjcMjw

[![Assista ao vídeo demonstrativo do Smart Scheduler](https://img.youtube.com/vi/BNyE8WjcMjw/maxresdefault.jpg)](https://youtu.be/BNyE8WjcMjw)

> Clique na imagem acima para assistir ao vídeo demonstrativo.

## Funcionalidades

- Criar agendamentos de serviços
- Listar agendamentos ordenados por data e horário
- Excluir agendamentos
- Validar campos obrigatórios com mensagens amigáveis
- Impedir agendamentos em datas passadas
- Impedir agendamentos no dia atual com horário já passado
- Exibir feedback visual de sucesso e erro

## Tecnologias

- Node.js 22
- Express
- React
- Vite
- PostgreSQL
- Docker Compose
- node-pg-migrate
- Jest
- Supertest
- ESLint
- Prettier
- GitHub Actions
- Render
- Vercel
- Neon

## Arquitetura

O backend foi organizado com uma estrutura simples inspirada em MVC:

```txt
backend/
  controllers/
  models/
  routes/
  migrations/
  app.js
  database.js
  server.js

frontend/
  services/
  App.jsx
  main.jsx
  style.css

tests/
```

- `routes`: define os endpoints da API.
- `controllers`: trata requisições, respostas e validações.
- `models`: concentra o acesso ao banco com SQL usando `pg`.
- `migrations`: versiona a estrutura do banco.
- `frontend/services`: centraliza as chamadas HTTP feitas pelo React.

## Requisitos

- Node.js 22
- npm
- Docker
- Docker Compose

## Variáveis De Ambiente

O projeto possui dois arquivos locais versionados para facilitar a execução:

- `.env.development`
- `.env.test`

As variáveis de produção são configuradas diretamente nas plataformas de deploy:

- Render: `DATABASE_URL`, `NODE_ENV`, `CORS_ORIGIN`
- Vercel: `VITE_API_URL`

## Instalação

```bash
npm install
```

## Rodar A Aplicação Completa

Este comando sobe o banco com Docker, executa as migrations de desenvolvimento e inicia backend e frontend:

```bash
npm run dev
```

Backend:

```txt
http://localhost:3000
```

Frontend:

```txt
http://localhost:5173
```

## Rodar Manualmente

Subir banco:

```bash
npm run services:up
```

Rodar migrations:

```bash
npm run migrations:up
```

Iniciar backend:

```bash
npm run dev:backend
```

Iniciar frontend em outro terminal:

```bash
npm run dev:frontend
```

## Migrations

Criar uma migration:

```bash
npm run migrations:create nome-da-migration
```

Rodar migrations no banco de desenvolvimento:

```bash
npm run migrations:up
```

Rodar migrations no banco de teste:

```bash
npm run migrations:test
```

Rodar migrations em produção:

```bash
npm run migrations:deploy
```

## Testes

```bash
npm test
```

O comando local de teste sobe o banco, executa as migrations de teste e roda o Jest.

Os testes do backend usam um banco separado configurado em `.env.test`, evitando misturar dados de desenvolvimento com dados de teste.

No CI, o workflow usa:

```bash
npm run test:ci
```

O `test:ci` executa apenas o Jest, porque o GitHub Actions já sobe o PostgreSQL e roda as migrations em etapas anteriores.

## Qualidade De Código

Rodar lint e verificação de formatação:

```bash
npm run lint
npm run format:check
```

Formatar arquivos automaticamente:

```bash
npm run format:write
```

## Build Do Frontend

```bash
npm run build
```

## Rotas Da API

### Health Check

```txt
GET /health
GET /health/database
```

### Listar Agendamentos

```txt
GET /appointments
```

### Criar Agendamento

```txt
POST /appointments
```

Body:

```json
{
  "clientName": "Maria Silva",
  "appointmentDate": "2026-07-10",
  "appointmentTime": "14:30",
  "serviceDescription": "Corte de cabelo"
}
```

### Excluir Agendamento

```txt
DELETE /appointments/:id
```

## Banco De Dados

O projeto usa PostgreSQL com migrations gerenciadas pelo `node-pg-migrate`.

No ambiente local, o PostgreSQL roda com Docker Compose. Em produção, o banco está hospedado no Neon.

As migrations ficam em:

```txt
backend/migrations
```

## Testes Automatizados

Os testes do backend foram escritos com Jest e Supertest.

Cenários cobertos:

- criação de agendamento
- listagem de agendamentos
- exclusão de agendamento
- rejeição de campos obrigatórios ausentes
- rejeição de datas passadas
- rejeição de horário passado no dia atual

## CI/CD

O GitHub Actions roda em pull requests e pushes para a `main`.

O workflow verifica:

- lint
- formatação
- migrations do banco
- testes do backend
- build do frontend

Deploy:

- Frontend: Vercel
- Backend: Render
- Banco de dados: Neon

## Padrão De Commits

O projeto usa Commitizen e Conventional Commits.

```bash
npm run commit
```

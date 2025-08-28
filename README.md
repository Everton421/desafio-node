# README.md
# Desafio Node.js

Este projeto é uma API RESTful desenvolvida em Node.js utilizando Fastify, Drizzle ORM e PostgreSQL. O objetivo é gerenciar cursos, usuários e matrículas, incluindo autenticação e documentação automática via Swagger.

## Tecnologias Utilizadas

- Node.js
- Fastify
- Drizzle ORM
- PostgreSQL
- Zod (validação de esquemas)
- Swagger/OpenAPI (documentação)
- Vitest (testes)
- Argon2 (hash de senhas)
- Docker (ambiente de banco de dados)

## Funcionalidades

- Cadastro de cursos
- Listagem de cursos
- Consulta de curso por ID
- Cadastro e autenticação de usuários
- Matrícula de usuários em cursos
- Documentação automática da API em `/docs`

## Como rodar o projeto

1. **Clone o repositório**
2. **Instale as dependências**
   ```sh
   npm install
   ```
3. **Configure as variáveis de ambiente**
   - Copie `.env.example` para `.env` e ajuste conforme necessário.

4. **Suba o banco de dados com Docker**
   ```sh
   docker-compose up -d
   ```

5. **Execute as migrações**
   ```sh
   npm run db:migrate
   ```

6. **(Opcional) Popule o banco com dados iniciais**
   ```sh
   npm run db:seed
   ```

7. **Inicie o servidor**
   ```sh
   npm run dev
   ```

8. **Acesse a documentação**
   - [http://localhost:3000/docs](http://localhost:3000/docs)

## Rodando os testes

```sh
npm test
```

## Estrutura de Pastas

- `src/` - Código fonte da aplicação
  - `routes/` - Rotas da API
  - `database/` - Configuração, migrações e seeds do banco de dados
  - `tests/` - Testes automatizados
- `docker/` - Scripts e configurações do Docker
- `coverage/` - Relatórios de cobertura de testes

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run db:migrate` - Executa as migrações do banco de dados
- `npm run db:seed` - Popula o banco de dados com dados iniciais
- `npm test` - Executa os testes automatizados

---

Desenvolvido para fins de estudo
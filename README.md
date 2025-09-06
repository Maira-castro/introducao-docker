# 📘 API de Gerenciamento de Produtos
## 📌 Sobre o Projeto

Esta é uma API robusta e escalável, desenvolvida para o gerenciamento completo de produtos, incluindo funcionalidades de cadastro, autenticação de usuários e operações CRUD (Create, Read, Update, Delete) em produtos. A API foi construída utilizando o framework NestJS e a linguagem TypeScript, seguindo as melhores práticas de desenvolvimento.

# 📦 Pré-requisitos :

Antes de iniciar o projeto, é necessário ter algumas ferramentas instaladas no seu computador. Elas são essenciais para o funcionamento da aplicação e para que você possa executá-la localmente.

### 🔧 Git :

O Git é um sistema de controle de versão. Ele permite que você clone (copie) o projeto do repositório remoto para a sua máquina e também contribua com atualizações no código.

- 🔗 Baixar: [https://git-scm.com/downloads](https://git-scm.com/downloads)
- 📥 Após a instalação, verifique se está funcionando corretamente:
  ```bash
  git --version

<!-- - Esse e nosso repositório no git 
 - [Git](https://github.com/amontada-valley/squad-02-amotur-backend) -->
 ## 📁 Repositório do projeto:
https://github.com/Maira-castro/introducao-docker

## 🐳 Instalando Docker.
O Docker é uma plataforma que permite criar containers — ambientes isolados que contêm tudo o que seu projeto precisa para rodar (linguagem, dependências, banco de dados, etc.).

No nosso caso, usamos o Docker para rodar tanto o banco de dados quanto a própria aplicação de forma automatizada e independente do seu sistema operacional.

🧭 Passos para instalar:
Acesse o site do Docker:

- [Docker e Docker Compose](https://www.docker.com/get-started)

Baixe a versão compatível com o seu sistema operacional:

Windows (com WSL2 habilitado)

macOS (Intel ou Apple Silicon)

Linux (use o gerenciador de pacotes da sua distribuição)

Siga o processo de instalação da interface do Docker Desktop.

Após instalar, reinicie o computador se necessário e abra o Docker Desktop para garantir que está rodando corretamente.

Para confirmar se está tudo funcionando, execute os comandos no terminal:

```bash
$ docker --version
$ docker compose version
```


# 🚀 Funcionalidades
### 🔑 Autenticação (Auth)
- Registro de usuários
- Login seguro com autenticação via JWT (JSON Web Tokens)

### 👤 Usuários (Users)
- Listagem de todos os usuários cadastrados
- Pesquisa de usuário por endereço de e-mail

### 📦 Produtos (Products)
- Criação de novos produtos
- Listagem de todos os produtos
- Consulta de produto por ID
- Atualização e exclusão de produtos

### 💼 Perfil (Profile)
- Atualização de informações do perfil do usuário
- Exclusão da própria conta (desativação de perfil)


## 🛠️ Tecnologias Utilizadas

- Node.js
- NestJS
- Prisma (ORM)
- Swagger (documentação da API)
- PostgreSQL


## 📦 Clone.
```bash
$ https://github.com/Maira-castro/introducao-docker.git
```

## 📥 Instalando as dependências.

```bash
$ npm install
```

## 📦 Criar um .env:
```bash
$ cp .env.example .env
```
- Preencha os campos corretamente.

## 🧬 Inicializando o Prisma.
```bash
$ npx prisma migrate dev --name [new_name]
$ npx prisma generate
```

## 🔼 Subindo os containers com Docker Compose.
- O Docker deve estar iniciado.
```bash
$ docker compose up --build -d
```

## 🚀 Iniciando a API.

```bash
$ npm run start:dev
```
- Caso se der um erro na porta (localhost:3333), vc vai ate o arquivo docker-compose.yml, mude a porta do lado esquerdo, depois va no .env na (URL) e mude a porta para a mesma.

- Depois use o comando: 
```bash
$ docker compose down
$ docker compose up -d
```


A API estará disponível em: http://localhost:3002

## 🧪 Teste e Documentação.
A API está documentada com Swagger, permitindo fácil exploração dos endpoints diretamente pelo navegador.
http://localhost:3002/api

# 📌 Status do Projeto

✅ Em desenvolvimento contínuo.
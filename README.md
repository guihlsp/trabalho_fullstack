# Projeto de CRUD de Bebidas

Este é um projeto de CRUD de bebidas desenvolvido em React, utilizando Express como servidor backend e MySQL como banco de dados.

# Alunos

- Guilherme Henrique Pereira Luiz Soares
- Lucas Emmanuel Estevão da Paixão
- Luiz Filipe Marques Nascimento
- Rodrigo Tadeu

## Pré-requisitos

Antes de começar, verifique se o seguinte software está instalado em sua máquina:

- Node.js (versão 12 ou superior)
- MySQL Server

## Configuração do Banco de Dados

1. Execute a seguinte query no seu servidor MySQL para criar o banco de dados e as tabelas necessárias:

```sql
    CREATE DATABASE bebidas_db;
    USE bebidas_db;

    CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50)
    );

    CREATE TABLE bebidas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    descricao TEXT,
    categoria_id INT,
    categoria_nome VARCHAR(100),
    teor_alcoolico FLOAT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    );
```
2. Certifique-se de ter as informações de conexão corretas do seu banco de dados MySQL (host, porta, nome de usuário e senha) para configurar a conexão com o servidor.

# Instalação

1. Clone o repositório do projeto:

    - git clone https://github.com/guihlsp/trabalho_fullstack.git bebidas_app

2. Acesse a pasta do projeto:

    - cd bebidas_app

3. Instale as dependências:

    - npm install

# Execução

1. Inicie o servidor backend:

    - cd src/server
    - node server.js

2. Em outro terminal, inicie o aplicativo React:

    - npm start

3. O aplicativo estará disponível em http://localhost:3000 e o servidor backend estará em http://localhost:5000.

# 

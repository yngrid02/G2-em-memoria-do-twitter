# Integrantes

Yngrid Guimarães Silva

Taylanne Castela Branco Cavalcante

Pedro Pinheiro Teixeira 

# Configurando o Frontend (Interface com React)

## 1. Crie o projeto React via Vite. Dentro de uma pasta, abra o terminal e execute o comando:

```bash
npm create vite@latest Frontend -- --template react
```

Use o nome Frontend para nomear o projeto

## 2. Entre na pasta do Frontend que o Vite acabou de criar

```bash
cd Frontend
```

## 3. Instala as dependências padrão do React

```bash
npm install
```

## 4. Instala as bibliotecas (React Hook Form, Axios e Router)

```bash
npm install react-hook-form axios
npm install react-router-dom
```

----------------------

# Configurando o Backend (Servidor e Banco de Dados)

## 1. Cria a pasta do Backend e a pasta de rotas dentro dela

```bash
mkdir -p Backend/routes
```

## 2. Entra na pasta do Backend

```bash
cd Backend
```

## 3. Inicializa o arquivo package.json padrão

```bash
npm install
npm init -y
```

## 4. Instala o Express, o SQLite3 e o CORS

```bash
npm install express sqlite3 cors
```

----------------------

# Como Executar o Sistema Completo

## Rodar o Backend: No terminal aberto dentro da pasta /Backend, digite:

```bash
node server.js
```


## Rodar o Frontend: No outro terminal aberto dentro da pasta /Frontend, digite:

```bash
npm run dev
```
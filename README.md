
# 🏆 TierList Final Frontend

Este é um projeto React com suporte a **drag & drop** para criação, organização e edição de **Tier Lists personalizadas**, ideal para rankings de filmes, jogos, personagens ou qualquer categoria!

> ⚙️ Backend simulado via [`json-server`](https://github.com/typicode/json-server)

---

## 🎯 Funcionalidades

- ✅ Criar novas Tier Lists  
- ✅ Adicionar e nomear itens  
- ✅ Mover itens entre categorias (S, A, B, C, D)  
- ✅ Arrastar itens para a lixeira para removê-los  
- ✅ Editar nome dos itens com clique direto  
- ✅ Itens não classificados agrupados na seção “?”

---

## 🚀 Tecnologias Utilizadas

- React  
- Vite  
- TailwindCSS  
- @dnd-kit/core (drag & drop)  
- Axios  
- React Router DOM  
- json-server (API local simulada)

---

## 💻 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/JoaoMiguelRita/TierList-Final-Frontend.git
cd TierList-Final-Frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor fake (json-server)

```bash
npm run server
```

Servidor estará em: [http://localhost:3000](http://localhost:3000)

### 4. Inicie o frontend React

```bash
npm run dev
```

Frontend estará em: [http://localhost:5173](http://localhost:5173)

---

## 📁 Estrutura do Projeto

```
TierList-Final-Frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── dnd/        → Componentes de arrastar e soltar
│   │   ├── header/     → Cabeçalho
│   │   └── home/       → Formulário de criação inicial
│   ├── pages/          → Páginas principais (Home, TierListPage, etc.)
│   ├── layout/         → Layout base
│   └── App.jsx / main.jsx
├── db.json             → Base simulada de dados (json-server)
└── package.json
```

---

## 🌐 Endpoints da API (`json-server`)

Todos os dados são armazenados no arquivo `db.json` e servidos localmente.

### 🔧 Estrutura de uma Tier List

```json
{
  "id": "uuid",
  "name": "Minha Tier List",
  "type": "tier",
  "items": [
    {
      "id_item": "uuid",
      "name_item": "Item 1",
      "image_url": "",
      "tier": "S"
    }
  ]
}
```

---

### 📖 Rotas disponíveis

| Método | Endpoint           | Descrição                            |
|--------|--------------------|----------------------------------------|
| GET    | `/tierList`        | Lista todas as tier lists              |
| GET    | `/tierList/:id`    | Busca uma tier list específica         |
| POST   | `/tierList`        | Cria uma nova tier list                |
| PATCH  | `/tierList/:id`    | Atualiza os dados de uma tier list     |
| DELETE | `/tierList/:id`    | Remove uma tier list inteira           |

---

### 📌 Exemplo: Criar Tier List

```http
POST /tierList
```

```json
{
  "id": "abc123",
  "name": "Filmes Favoritos",
  "type": "tier",
  "items": []
}
```

---

### ➕ Exemplo: Adicionar item

```http
PATCH /tierList/abc123
```

```json
{
  "items": [
    {
      "id_item": "xyz789",
      "name_item": "Matrix",
      "image_url": "",
      "tier": "?"
    }
  ]
}
```

---

## 📦 Scripts disponíveis

| Comando         | Descrição                          |
|-----------------|------------------------------------|
| `npm run dev`   | Inicia o frontend React (Vite)     |
| `npm run server`| Inicia o json-server em `localhost:3000` |

---


## 🧑‍💻 Autores

Desenvolvido por [João Miguel Rita](https://github.com/JoaoMiguelRita),
                 [Gustavo de Freitas Cardoso](https://github.com/gustavofreitas19)

---

## 📄 Licença

Este projeto está sob a licença MIT.

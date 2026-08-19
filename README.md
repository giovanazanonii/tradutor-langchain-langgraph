# Tradutor-Langchain-Langgraph

## Descrição

Este projeto consiste em uma API REST para tradução de textos utilizando LangChain, LangGraph e Ollama. O fluxo de tradução é realizado por um grafo composto por dois nós: o primeiro realiza a tradução do texto para o idioma desejado e o segundo revisa a tradução, corrigindo possíveis erros gramaticais e melhorando a naturalidade do texto.

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- LangChain
- LangGraph
- Ollama
- Llama 3.2 3B

## Instalação

Clone o repositório:

```bash
git clone https://github.com/giovanazanonii/tradutor-langchain-langgraph.git
```

Entre na pasta do projeto:

```bash
cd tradutor-langchain-langgraph
```

Instale as dependências:

```bash
npm install
```

## Executando o projeto

Inicie o Ollama:

```bash
ollama serve
```

Caso o modelo ainda não esteja instalado:

```bash
ollama pull llama3.2:3b
```

Inicie a aplicação:

```bash
npm run dev
```

O servidor ficará disponível em:

```
http://localhost:3000
```

## Tratamento de erros

A API realiza validação dos dados recebidos.

Exemplos:

- texto obrigatório
- idioma obrigatório
- texto vazio
- idioma vazio

## Estrutura do projeto

```text
src/
│
├── graph/
│   └── grafo-tradutor.ts   → Define o LangGraph
│
├── routes/
│   └── translate.ts        → Endpoint da API
│
├── app.ts                  → Configuração do Express
│
└── server.ts               → Inicialização do servidor
```
## Autores

Este projeto foi realizado pelos desenvolvedores /betinalimaj, /giovanazanonii e /leozhxl 
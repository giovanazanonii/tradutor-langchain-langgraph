import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Annotation, StateGraph, START, END } from "@langchain/langgraph";

const TradutorState = Annotation.Root({
  texto: Annotation<string>(),
  idioma: Annotation<string>(),
  traducao: Annotation<string>(),
  revisao: Annotation<string>(),
});

type EstadoTradutor = typeof TradutorState.State;

const model = new ChatOllama({
  model: "llama3.2:3b",
  temperature: 0,
});

// ======================
// Nó de tradução
// ======================

const promptTraducao = ChatPromptTemplate.fromMessages([
  [
    "system",
    `Você é um tradutor profissional.

Sua única função é traduzir.

REGRAS:

- Nunca explique.
- Nunca defina palavras.
- Nunca responda perguntas.
- Nunca complete frases.
- Nunca invente contexto.
- Nunca acrescente informações.
- Preserve pontuação.
- Preserve quebras de linha.

Se receber apenas uma palavra, traduza apenas essa palavra.

Responda SOMENTE com a tradução.`,
  ],

  [
    "human",
    `Idioma de destino: {idioma}

Texto:

{texto}`,
  ],
]);

async function traduzir(
  state: EstadoTradutor
): Promise<Partial<EstadoTradutor>> {

  const mensagens = await promptTraducao.formatMessages({
    idioma: state.idioma,
    texto: state.texto,
  });

  const resposta = await model.invoke(mensagens);

  return {
    traducao: String(resposta.content).trim(),
  };
}

// ======================
// Nó de revisão
// ======================

const promptRevisao = ChatPromptTemplate.fromMessages([
  [
    "system",
    `Você é um revisor nativo.

Revise a tradução mantendo exatamente o mesmo significado.

Corrija:
- gramática
- ortografia
- naturalidade

Nunca explique.

Retorne somente a versão final.`,
  ],
  [
    "human",
    "Idioma: {idioma}\n\nTradução:\n{traducao}",
  ],
]);

async function revisar(
  state: EstadoTradutor
): Promise<Partial<EstadoTradutor>> {

  const mensagens = await promptRevisao.formatMessages({
    idioma: state.idioma,
    traducao: state.traducao,
  });

  const resposta = await model.invoke(mensagens);

  return {
    revisao: String(resposta.content).trim(),
  };
}

// ======================
// Grafo
// ======================

const grafo = new StateGraph(TradutorState)
  .addNode("traduzir", traduzir)
  .addNode("revisar", revisar)
  .addEdge(START, "traduzir")
  .addEdge("traduzir", "revisar")
  .addEdge("revisar", END);

export default grafo.compile();
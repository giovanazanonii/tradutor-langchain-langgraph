import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Annotation, StateGraph, START, END } from "@langchain/langgraph";

// ------------------------------------------------------------------
// STATE
// Define o "formato" dos dados que trafegam entre os nós do grafo.
// Cada campo descreve como o valor é atualizado a cada passo (aqui,
// o novo valor sempre substitui o anterior).
// ------------------------------------------------------------------
const TradutorState = Annotation.Root({
  texto: Annotation<string>(),
  idioma: Annotation<string>(),
  traducao: Annotation<string>(),
  revisao: Annotation<string>(),
});

type EstadoTradutor = typeof TradutorState.State;

const model = new ChatOllama({
  model: "llama3.2:3b",
});

// ------------------------------------------------------------------
// NODE 1: traduzir
// Um node é uma função que recebe o estado atual e devolve um
// "patch" (pedaço) do estado, que é mesclado ao estado global.
// ------------------------------------------------------------------
const promptTraducao = ChatPromptTemplate.fromTemplate(
  "Traduza o texto abaixo para {idioma}. Responda apenas com o texto traduzido, sem comentários:\n\n{texto}",
);

async function traduzir(state: EstadoTradutor): Promise<Partial<EstadoTradutor>> {
  const mensagem = await promptTraducao.format({
    idioma: state.idioma,
    texto: state.texto,
  });

  const response = await model.invoke(mensagem);

  return { traducao: response.content as string };
}

// ------------------------------------------------------------------
// NODE 2: revisar
// Segundo node, que consome a saída do node anterior (traducao)
// e produz uma revisão/melhoria do texto traduzido.
// ------------------------------------------------------------------
const promptRevisao = ChatPromptTemplate.fromTemplate(
  "Revise a tradução abaixo para {idioma}, corrigindo eventuais erros " +
    "gramaticais ou de naturalidade. Responda apenas com o texto final:\n\n{traducao}",
);

async function revisar(state: EstadoTradutor): Promise<Partial<EstadoTradutor>> {
  const mensagem = await promptRevisao.format({
    idioma: state.idioma,
    traducao: state.traducao,
  });

  const response = await model.invoke(mensagem);

  return { revisao: response.content as string };
}

// ------------------------------------------------------------------
// GRAFO
// EDGE liga um node a outro, definindo a ordem de execução.
// START e END são nós especiais que marcam o ponto de entrada e
// saída do grafo.
//
//   START -> traduzir -> revisar -> END
// ------------------------------------------------------------------
const grafo = new StateGraph(TradutorState)
  .addNode("traduzir", traduzir)
  .addNode("revisar", revisar)
  .addEdge(START, "traduzir")
  .addEdge("traduzir", "revisar")
  .addEdge("revisar", END);

// compile() transforma a definição do grafo em algo executável (Runnable)
const app = grafo.compile();

export default app;

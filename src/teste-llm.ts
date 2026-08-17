import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const prompt = ChatPromptTemplate.fromTemplate(
  "Traduza o texto abaixo para {idioma}:\n\n{texto}",
);

const model = new ChatOllama({
  model: "llama3.2:3b",
});

async function main() {
  const mensagem = await prompt.format({
    idioma: "Francês",
    texto: "Olá, pessoal do time!",
  });

  const response = await model.invoke(mensagem);

  console.log(response.content);
}

main();

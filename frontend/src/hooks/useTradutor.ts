import { useCallback, useEffect, useState } from "react";
import { traduzir } from "../services/api";
import { idiomas, type Idioma, type MapaIdiomas } from "../types/idioma";

const mapaIdiomas: MapaIdiomas = {
  Português: "Português",
  Inglês: "English",
  Espanhol: "Español",
  Francês: "Français",
  Alemão: "Deutsch",
  Italiano: "Italiano",
  Japonês: "日本語",
  Chinês: "中文",
  Coreano: "한국어",
};

export function useTradutor() {
  const [idiomaOrigem, setIdiomaOrigem] = useState<Idioma>("Português");
  const [idiomaDestino, setIdiomaDestino] = useState<Idioma>("Inglês");
  const [texto, setTexto] = useState("");
  const [traducao, setTraducao] = useState("");
  const [menuOrigemAberto, setMenuOrigemAberto] = useState(false);
  const [menuDestinoAberto, setMenuDestinoAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const traduzirTexto = useCallback(async () => {
    if (!texto.trim()) {
      setTraducao("");
      return;
    }

    try {
      setCarregando(true);

      const resultado = await traduzir(texto, mapaIdiomas[idiomaDestino]);

      setTraducao(resultado);
    } catch (error) {
      console.error(error);
      setTraducao("Erro ao traduzir.");
    } finally {
      setCarregando(false);
    }
  }, [texto, idiomaDestino]);

  function inverterIdiomas() {
    const origem = idiomaOrigem;

    setIdiomaOrigem(idiomaDestino);
    setIdiomaDestino(origem);

    setTexto(traducao);
    setTraducao(texto);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      void traduzirTexto();
    }, 500);

    return () => clearTimeout(timer);
  }, [traduzirTexto]);

  return {
    idiomas,
    idiomaOrigem,
    setIdiomaOrigem,
    idiomaDestino,
    setIdiomaDestino,
    texto,
    setTexto,
    traducao,
    menuOrigemAberto,
    setMenuOrigemAberto,
    menuDestinoAberto,
    setMenuDestinoAberto,
    carregando,
    inverterIdiomas,
  };
}

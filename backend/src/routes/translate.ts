import { Router, Request, Response } from "express";
import appTradutor from "../graph/grafo-tradutor";
import { TranslateDto } from "../dto/translate.dto";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { texto, idioma } = req.body as TranslateDto;

    const resultado = await appTradutor.invoke({
      texto,
      idioma,
    });

    return res.json({
      traducao: resultado.revisao,
    });
  } catch (error: unknown) {
    console.error("Erro ao traduzir:", error);

    return res.status(500).json({
      erro: "Não foi possível realizar a tradução.",
    });
  }
});

export default router;

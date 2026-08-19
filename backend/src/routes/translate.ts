import { Router, Request, Response } from "express";
import appTradutor from "../graph/grafo-tradutor";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { texto, idioma } = req.body;

        // Validação do texto
        if (
            !texto ||
            typeof texto !== "string" ||
            texto.trim() === ""
        ) {
            return res.status(400).json({
                erro: "O campo 'texto' é obrigatório!",
            });
        }

        // Validação do idioma
        if (
            !idioma ||
            typeof idioma !== "string" ||
            idioma.trim() === ""
        ) {
            return res.status(400).json({
                erro: "O campo 'idioma' é obrigatório!",
            });
        }

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
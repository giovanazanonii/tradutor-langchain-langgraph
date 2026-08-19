const API_URL = "http://localhost:3000";

interface TraducaoResponse {
    traducao: string;
}

export async function traduzir(
    texto: string,
    idioma: string
): Promise<string> {

    const response = await fetch(`${API_URL}/translate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            texto,
            idioma,
        }),
    });

    if (!response.ok) {
        const erro = await response.json();

        throw new Error(erro.erro);
    }

    const data: TraducaoResponse = await response.json();

    return data.traducao;
}
import axios from "axios";
import { Request, Response } from "express";

type PlanoTipo = "medio" | "avancado";

const planos: Record<PlanoTipo, { title: string; price: number }> = {
  medio: { title: "Plano Médio", price: 49 },
  avancado: { title: "Plano Avançado", price: 99 },
};

interface MercadoPagoResponse {
  init_point: string;
  id: string;
  // você pode adicionar mais campos se quiser, mas esses são os principais
}

export const criarPagamento = async (req: Request, res: Response) => {
  const { empresaId, plano } = req.body;

  if (!empresaId || !plano) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  if (!["medio", "avancado"].includes(plano)) {
    return res.status(400).json({ error: "Plano inválido" });
  }

  const item = planos[plano as PlanoTipo];

  try {
    const response = await axios.post<MercadoPagoResponse>(
      "https://api.mercadopago.com/checkout/preferences",
      {
        items: [
          {
            title: item.title,
            quantity: 1,
            unit_price: item.price,
          },
        ],
        back_urls: {
          success: `http://localhost:5173/pagamento-sucesso?empresaId=${empresaId}&plano=${plano}`,
          failure: "http://localhost:5173/pagamento-falhou",
        },
        auto_return: "approved",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );

    res.json({ init_point: response.data.init_point });
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
};

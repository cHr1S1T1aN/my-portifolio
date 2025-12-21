import { Request, Response } from "express";
import { TesteService } from "../services/TesteService";

const testeService = new TesteService();

export class TesteController {
  // Criar novo teste (com projeto, se houver)
  async criarTeste(req: Request, res: Response) {
    try {
      const novoTeste = await testeService.criar(req.body);
      res.status(201).json({ success: true, teste: novoTeste });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
  // Buscar respostas de um teste
async listarRespostasDoTeste(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const respostas = await testeService.listarRespostas(id);

    res.status(200).json({ success: true, respostas });
  } catch (err: any) {
    console.error("Erro ao buscar respostas do teste:", err);
    res.status(500).json({ error: err.message });
  }
}
  

  // Listar testes vinculados a uma vaga
  async listarTestesPorVaga(req: Request, res: Response) {
    try {
      const { vagaId } = req.params;
      const testes = await testeService.listarPorVaga(vagaId);
      res.status(200).json({ success: true, testes });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  // Buscar teste por ID
  async buscarTestePorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const teste = await testeService.buscarPorId(id);
      res.status(200).json(teste);
    } catch (err: any) {
      console.error("Erro ao buscar teste:", err);
      res.status(404).json({ error: err.message });
    }
  }

  // Editar teste (inclui atualização de projeto)
  async editarTeste(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dados = req.body;
      await testeService.editar(id, dados);
      res.status(200).json({ success: true });
    } catch (err) {
      console.error("Erro ao editar teste:", err);
      res.status(500).json({ error: "Erro ao editar teste" });
    }
  }
}

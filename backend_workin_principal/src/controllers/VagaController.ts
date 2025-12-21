import { Request, Response } from "express";
import { VagaService } from "../services/VagaService";
import { EmpresaService } from "../services/EmpresaService";

const vagaService = new VagaService();

export class VagaController {
  async criarVaga(req: Request, res: Response) {
    
    try {
      const vaga = await vagaService.criarVaga(req.body);
      res.status(201).json(vaga);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async listarVagasPorEmpresa(req: Request, res: Response) {
    try {
      const { empresaId } = req.params;
      const vagas = await vagaService.listarVagasPorEmpresa(empresaId);
      res.status(200).json({ success: true, vagas });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async buscarVagaPorId(req: Request, res: Response) {
    try {
      const { vagaId } = req.params;
      const vaga = await vagaService.buscarVagaPorId(vagaId);
      if (!vaga) return res.status(404).json({ error: "Vaga não encontrada." });
      res.status(200).json({ vaga });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async atualizarVaga(req: Request, res: Response) {
    try {
      const { vagaId } = req.params;
      const vagaAtualizada = await vagaService.atualizarVaga(vagaId, req.body);
      res.status(200).json(vagaAtualizada);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async deletarVaga(req: Request, res: Response) {
    try {
      const { vagaId } = req.params;
      const resultado = await vagaService.deletarVaga(vagaId);
      res.status(200).json(resultado);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
    
  }
   async finalizarVaga(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { candidatoAceito } = req.body;
    await vagaService.finalizar(id, candidatoAceito);
    res.json({ success: true });
  } catch (error) {
    console.error("Erro ao finalizar vaga:", error);
    res.status(500).json({ error: "Erro ao finalizar vaga" });
  }
}
async listarVagasFinalizadas(req: Request, res: Response) {
  try {
    const { empresaId } = req.params;
    const vagas = await vagaService.listarVagasFinalizadas(empresaId);
    res.status(200).json({ success: true, vagas });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
async reativarVaga(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await vagaService.reativar(id);
    res.json({ success: true });
  } catch (error) {
    console.error("Erro ao reativar vaga:", error);
    res.status(500).json({ error: "Erro ao reativar vaga" });
  }
}
async listarVagasAtivasPorEmpresa(req: Request, res: Response) {
  try {
    const { empresaId } = req.params;
    const vagas = await vagaService.listarVagasPorEmpresa(empresaId);

    // Filtra apenas vagas ativas
    const vagasAtivas = vagas.filter((vaga: any) => vaga.ativa !== false);

    res.status(200).json({ success: true, vagas: vagasAtivas });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
};

import { Request, Response } from "express";
import { EmpresaService } from "../services/EmpresaService";
import jwt from "jsonwebtoken";
import { getFirestore } from "firebase-admin/firestore";


const db = getFirestore();
const service = new EmpresaService();

export class EmpresaController {
  
  /** 🔹 Listar todas as empresas */
  async listar(req: Request, res: Response) {
    try {
      const empresas = await service.listarEmpresas();
      return res.status(200).json({ success: true, empresas });
    } catch (error: any) {
      console.error("❌ Erro ao listar empresas:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  async listarCandidaturas(req: Request, res: Response) {
  try {
    const snapshot = await db.collectionGroup("candidatos").get();

    const candidaturas = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const vagaId = doc.ref.parent.parent?.id;

        // Buscar nome do aluno na coleção "alunos"
        let nomeCandidato = "";
        if (data.alunoId) {
          const alunoDoc = await db.collection("alunos").doc(data.alunoId).get();
          if (alunoDoc.exists) {
            nomeCandidato = alunoDoc.data()?.nome || "";
          }
        }

        // Buscar nome da vaga na coleção "vagas"
        let nomeVaga = "";
        if (vagaId) {
          const vagaDoc = await db.collection("vagas").doc(vagaId).get();
          if (vagaDoc.exists) {
            nomeVaga = vagaDoc.data()?.titulo || "";
          }
        }

        return {
          candidatoId: doc.id,
          alunoId: data.alunoId,
          vagaId,
          nomeCandidato,
          nomeVaga,
          status: data.status,
          dataCandidatura: data.dataCandidatura,
        };
      })
    );

    return res.status(200).json({ success: true, candidaturas });
  } catch (error: any) {
    console.error("❌ Erro ao listar candidaturas:", error);
    return res.status(500).json({ success: false, message: "Erro ao buscar candidaturas" });
  }
}

  

  /** 🔹 Buscar empresa por ID */
  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const empresa = await service.buscarEmpresaPorId(id);

      if (!empresa) {
        return res
          .status(404)
          .json({ success: false, message: "Empresa não encontrada." });
      }

      return res.status(200).json({ success: true, empresa });
    } catch (error: any) {
      console.error("❌ Erro ao buscar empresa:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  /** 🔹 Criar empresa (gera token automaticamente) */
  async criar(req: Request, res: Response) {
    try {
      const { token, empresa } = await service.criarEmpresa(req.body);

      const tokenJwt = jwt.sign(
        {
          id: empresa.id,
          email: empresa.emailCorporativo, // ← aqui o TS entende o tipo certo
        },
        process.env.JWT_SECRET || "secreta",
        { expiresIn: "7d" }
      );


      return res.status(201).json({
        success: true,
        message: "✅ Empresa criada com sucesso!",
        token,
        empresa,
      });
    } catch (error: any) {
      console.error("❌ Erro ao criar empresa:", error);
      return res.status(400).json({
        success: false,
        message: error.message || "Erro ao criar empresa.",
      });
    }
  }

  /** 🔹 Login */
  async login(req: Request, res: Response) {
    try {
      const { emailCorporativo, senha } = req.body;
      const result = await service.loginEmpresa(emailCorporativo, senha);

      return res.status(200).json({
        success: true,
        token: result.token,
        empresa: result.empresa,
        empresaId: result.empresa.id,
      });
    } catch (error: any) {
      console.error("❌ Erro no login:", error);
      return res.status(401).json({
        success: false,
        message: error.message || "Credenciais inválidas.",
      });
    }
  }

  /** 🔹 Atualizar empresa */
  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const empresa = await service.atualizarEmpresa(id, req.body);

      return res.status(200).json({
        success: true,
        message: "Dados atualizados com sucesso!",
        empresa,
      });
    } catch (error: any) {
      console.error("❌ Erro ao atualizar empresa:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  /** 🔹 Deletar empresa */
  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await service.deletarEmpresa(id);
      return res.status(200).json({ success: true, ...result });
    } catch (error: any) {
      console.error("❌ Erro ao deletar empresa:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  /** 🔹 Solicitar redefinição de senha */
  async solicitarRedefinicaoSenha(req: Request, res: Response) {
    try {
      const { emailCorporativo } = req.body;

      if (!emailCorporativo) {
        return res
          .status(400)
          .json({ success: false, message: "E-mail é obrigatório." });
      }

      const result = await service.solicitarRedefinicaoSenha(emailCorporativo);
      return res.status(200).json({ success: true, message: result.message });
    } catch (error: any) {
      console.error("❌ Erro ao solicitar redefinição:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  /** 🔹 Redefinir senha */
  async redefinirSenha(req: Request, res: Response) {
    try {
      const { token, novaSenha } = req.body;

      if (!token || !novaSenha) {
        return res.status(400).json({
          success: false,
          message: "Token e nova senha são obrigatórios.",
        });
      }

      const result = await service.redefinirSenha(token, novaSenha);
      return res.status(200).json({ success: true, message: result.message });
    } catch (error: any) {
      console.error("❌ Erro ao redefinir senha:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  

  /** 🔹 Atualizar plano */
  async atualizarPlano(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { plano } = req.body;

      await service.atualizarPlano(id, plano);
      return res.status(200).json({
        success: true,
        message: "Plano atualizado com sucesso!",
      });
    } catch (error: any) {
      console.error("❌ Erro ao atualizar plano:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
    
  }
  
}

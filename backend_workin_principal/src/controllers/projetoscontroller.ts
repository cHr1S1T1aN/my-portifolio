import { Request, Response } from "express";
import { Projeto } from "../types/types";

// ✅ 2️⃣ Mock inicial (enquanto não há banco)
let projetos: Projeto[] = [
  {
    id: "1",
    titulo: "Landing Page React",
    descricao: "Crie uma landing page moderna",
    empresaId: "1",
  },
];

// ✅ 3️⃣ Função padrão para resposta formatada
const sendResponse = (
  res: Response,
  status: number,
  success: boolean,
  message: string,
  data?: any
) => {
  res.status(status).json({ success, message, data });
};

// ✅ 4️⃣ Listar todos os projetos
export const listarProjetos = (req: Request, res: Response) => {
  sendResponse(res, 200, true, "Lista de projetos carregada com sucesso", projetos);
};

// ✅ 5️⃣ Criar novo projeto
export const criarProjeto = (req: Request, res: Response) => {
  const { titulo, descricao, empresaId } = req.body;

  if (!titulo || !descricao || !empresaId) {
    return sendResponse(
      res,
      400,
      false,
      "Campos obrigatórios: titulo, descricao, empresaId"
    );
  }

  const novo: Projeto = {
    id: (Date.now() + Math.random()).toString(),
    titulo,
    descricao,
    empresaId,
  };

  projetos.push(novo);
  sendResponse(res, 201, true, "Projeto criado com sucesso", novo);
};

// ✅ 6️⃣ Atualizar projeto existente
export const atualizarProjeto = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = projetos.findIndex((p) => p.id === id);

  if (index === -1) {
    return sendResponse(res, 404, false, "Projeto não encontrado");
  }

  projetos[index] = { ...projetos[index], ...req.body };
  sendResponse(res, 200, true, "Projeto atualizado com sucesso", projetos[index]);
};

// ✅ 7️⃣ Deletar projeto
export const deletarProjeto = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = projetos.findIndex((p) => p.id === id);

  if (index === -1) {
    return sendResponse(res, 404, false, "Projeto não encontrado");
  }

  projetos.splice(index, 1);
  sendResponse(res, 200, true, "Projeto deletado com sucesso");
};
import express from "express";
import multer from "multer";
import { EmpresaController } from "../controllers/EmpresasController";
import { autenticar } from "../middlewares/authMiddleware";

const router = express.Router();
const controller = new EmpresaController();

// Upload simples (caso precise no futuro)
const upload = multer();

/** 🔓 ROTAS PÚBLICAS (não exigem token)
 */

router.get("/candidaturas", (req, res) =>
  controller.listarCandidaturas(req, res)
);

// Login de empresa
router.post("/login", express.json(), (req, res) => controller.login(req, res));

// Cadastro de empresa
router.post("/", express.json(), (req, res) => controller.criar(req, res));

// Recuperação de senha
router.post("/esqueci-senha", express.json(), (req, res) =>
  controller.solicitarRedefinicaoSenha(req, res)
);

// Redefinição de senha
router.post("/redefinir-senha", express.json(), (req, res) =>
  controller.redefinirSenha(req, res)
);

/**
 * 🔐 ROTAS PROTEGIDAS (exigem token)
 */

// Listar todas
router.get("/", autenticar, (req, res) => controller.listar(req, res));

// Buscar uma empresa específica
router.get("/:id", autenticar, (req, res) => controller.buscarPorId(req, res));

// Atualizar dados
router.put("/:id", autenticar, express.json(), (req, res) =>
  controller.atualizar(req, res)
);

// Excluir empresa
router.delete("/:id", autenticar, (req, res) => controller.deletar(req, res));

export default router;

import express from "express";
import { VagaController } from "../controllers/VagaController";

const router = express.Router();
const controller = new VagaController();

router.post("/", controller.criarVaga);
router.get("/empresa/:empresaId", controller.listarVagasPorEmpresa);
router.get("/:vagaId", controller.buscarVagaPorId);
router.put("/:vagaId", controller.atualizarVaga);
router.delete("/:vagaId", controller.deletarVaga);
router.put("/:id/finalizar", controller.finalizarVaga); // ✅ Correção aqui
router.get("/finalizadas/:empresaId", controller.listarVagasFinalizadas);
router.put("/:id/reativar", controller.reativarVaga);
router.get("/empresa/:empresaId/ativas", controller.listarVagasAtivasPorEmpresa);
router.get("/empresa/:empresaId", controller.listarVagasPorEmpresa);
export default router;

import { Router } from "express";
import {
  listarProjetos,
  criarProjeto,
  atualizarProjeto,
  deletarProjeto
} from "../controllers/projetoscontroller";

const router = Router();

router.get("/", listarProjetos);
router.post("/", criarProjeto);
router.put("/:id", atualizarProjeto);
router.delete("/:id", deletarProjeto);

export default router;
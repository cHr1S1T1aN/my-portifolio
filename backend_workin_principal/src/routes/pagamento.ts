// src/routes/pagamentos.ts
import express from "express";
import { criarPagamento } from "../controllers/PagamentoController";

const router = express.Router();
router.post("/criar", criarPagamento);

export default router;

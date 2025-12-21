import express from "express";
import { getFirestore } from "firebase-admin/firestore";
import { TesteController } from "../controllers/TesteController";

const router = express.Router();
const controller = new TesteController();
const db = getFirestore();

// ================= ROTAS PADRÃO =================

router.post("/", controller.criarTeste.bind(controller));
router.get("/vaga/:vagaId", controller.listarTestesPorVaga.bind(controller));

/**
 * ✅ IMPORTANTE:
 * Rotas mais específicas SEMPRE antes das genéricas
 */

// 🔥 Rota para buscar respostas do teste
router.get("/:id/respostas", async (req, res) => {
  try {
    const { id } = req.params;

    const testeDoc = await db.collection("testes").doc(id).get();

    if (!testeDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Teste não encontrado"
      });
    }

    const respostasSnap = await db
      .collection("testes")
      .doc(id)
      .collection("respostas")
      .get();

    const respostas = respostasSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return res.status(200).json({
      success: true,
      respostas
    });
  } catch (error) {
    console.error("Erro ao buscar respostas:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao buscar respostas"
    });
  }
});

// ✅ Buscar teste por ID
router.get("/:id", controller.buscarTestePorId.bind(controller));

// ✅ Editar teste
router.put("/:id", controller.editarTeste.bind(controller));

export default router;

import express from "express";
import { getFirestore } from "firebase-admin/firestore";

const router = express.Router();
const db = getFirestore();

// 🔹 Listar alunos com filtros
router.get("/", async (req, res) => {
  try {
    const { area, nome, interesse } = req.query;
    let query: FirebaseFirestore.Query = db.collection("alunos");

    if (area) query = query.where("areaAtuacao", "==", area);
    if (nome) query = query.where("nome", "==", nome);
    if (interesse) query = query.where("interesse", "==", interesse);

    const snapshot = await query.get();
    const alunos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.json({ success: true, alunos });
  } catch (error: any) {
    console.error("❌ Erro ao listar alunos:", error);
    return res.status(500).json({ success: false, message: "Erro ao listar alunos" });
  }
});

// 🔹 Buscar aluno por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const alunoDoc = await db.collection("alunos").doc(id).get();

    if (!alunoDoc.exists) {
      return res.status(404).json({ success: false, message: "Aluno não encontrado" });
    }

    return res.status(200).json({ success: true, aluno: alunoDoc.data() });
  } catch (error: any) {
    console.error("❌ Erro ao buscar aluno:", error);
    return res.status(500).json({ success: false, message: "Erro ao buscar aluno" });
  }
});

// 🔹 Enviar vaga + testes vinculados para notificações do aluno
router.post("/:id/vagaEnviada", async (req, res) => {
  try {
    const { id } = req.params; // alunoId
    const { vagaId } = req.body;

    // 1. Buscar vaga
    const vagaDoc = await db.collection("vagas").doc(vagaId).get();
    if (!vagaDoc.exists) {
      return res.status(404).json({ success: false, message: "Vaga não encontrada" });
    }
    const vagaData = { id: vagaDoc.id, ...vagaDoc.data() };

    // 2. Buscar testes vinculados à vaga
    const testesSnap = await db.collection("testes").where("vagaId", "==", vagaId).get();
    const testes = testesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // 3. Criar notificação na subcoleção do aluno
    await db.collection("alunos").doc(id).collection("notificacoes").add({
      vaga: vagaData,
      testes: testes,
      createdAt: new Date(),
      status: "pendente",
    });

    return res.json({ success: true, message: "Vaga e testes enviados ao aluno" });
  } catch (error: any) {
    console.error("❌ Erro ao enviar vaga:", error);
    return res.status(500).json({ success: false, message: "Erro ao enviar vaga" });
  }
});

// 🔹 Buscar APENAS as respostas da subcoleção "respostas" de uma notificação
router.get("/:alunoId/notificacoes/:notificacaoId/respostas", async (req, res) => {
  try {
    const { alunoId, notificacaoId } = req.params;

    const respostasSnap = await db
      .collection("alunos")
      .doc(alunoId)
      .collection("notificacoes")
      .doc(notificacaoId)
      .collection("respostas")
      .get();

    if (respostasSnap.empty) {
      return res.status(404).json({
        success: false,
        message: "Nenhuma resposta encontrada.",
      });
    }

    const respostas = respostasSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), // <-- Aqui já retorna exatamente o que você mostrou
    }));

    return res.json({
      success: true,
      respostas,
    });
  } catch (error) {
    console.error("❌ Erro ao buscar respostas:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao buscar respostas.",
    });
  }
});

export default router;

import { db } from "../config/firebase";

export class VagaService {
  private collection = db.collection("vagas");

  async criarVaga(dados: any) {
    const {
      titulo,
      descricao,
      areaProfissional,
      requisitos,
      faixaSalarial,
      modalidade,
      tipoContrato,
      vagaUrgente,
      beneficios,
      dataLimite,
      empresaId,
      teste,
    } = dados;

    if (!titulo || !descricao || !areaProfissional || !empresaId) {
      console.log("📦 Dados recebidos:", dados);
      throw new Error("Campos obrigatórios não preenchidos.");
    }

    const vaga = {
      titulo,
      descricao,
      areaProfissional,
      requisitos: requisitos || [],
      faixaSalarial: faixaSalarial || "",
      modalidade: modalidade || "",
      tipoContrato: tipoContrato || "",
      vagaUrgente: vagaUrgente || false,
      beneficios: beneficios || [],
      dataLimite: dataLimite || null,
      empresaId: String(empresaId),
      criadaEm: new Date().toISOString(),
      teste: teste || null,
      ativa: true, // ✅ sempre cria como ativa
    };

    const docRef = await this.collection.add(vaga);
    return { id: docRef.id, ...vaga };
  }

  async listarVagasPorEmpresa(empresaId: string) {
    console.log("🔍 Buscando vagas para empresaId:", empresaId);

    const snapshot = await this.collection
      .where("empresaId", "==", String(empresaId))
      .get();

    const vagas = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("📦 Total de vagas encontradas:", vagas.length);
    return vagas;
  }

  // ✅ NOVO: Listar apenas vagas ativas
  async listarVagasAtivasPorEmpresa(empresaId: string) {
    const snapshot = await this.collection
      .where("empresaId", "==", String(empresaId))
      .where("ativa", "==", true) // só vagas ativas
      .get();

    const vagas = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return vagas;
  }

  async buscarVagaPorId(vagaId: string) {
    const doc = await this.collection.doc(vagaId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async atualizarVaga(vagaId: string, dados: Partial<any>) {
    await this.collection.doc(vagaId).update(dados);
    const doc = await this.collection.doc(vagaId).get();
    return { id: vagaId, ...doc.data() };
  }

  async deletarVaga(vagaId: string) {
    await this.collection.doc(vagaId).delete();
    return { message: "Vaga deletada com sucesso." };
  }

  async finalizar(vagaId: string, candidatoAceito?: string) {
    await this.collection.doc(vagaId).update({
      ativa: false,
      finalizadaEm: new Date().toISOString(),
      candidatoAceito: candidatoAceito || null,
    });
  }

  async listarVagasFinalizadas(empresaId: string) {
    const snapshot = await this.collection
      .where("empresaId", "==", String(empresaId))
      .where("ativa", "==", false)
      .get();

    const vagas = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return vagas;
  }

  async reativar(vagaId: string) {
    await this.collection.doc(vagaId).update({
      ativa: true,
      finalizadaEm: null,
    });
  }
}

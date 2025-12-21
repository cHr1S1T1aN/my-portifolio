import { db } from "../config/firebase";

export class TesteService {
  private collection = db.collection("testes");

  async criar(dados: any) {
    const docRef = await this.collection.add({
      ...dados,
      criadoEm: new Date().toISOString(),
    });

    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
  }

  async editar(id: string, dados: any) {
    await this.collection.doc(id).update({
      ...dados,
    });
  }


  async listarPorVaga(vagaId: string) {
    const snapshot = await this.collection.where("vagaId", "==", vagaId).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async buscarPorId(id: string) {
    const doc = await this.collection.doc(id).get();

    if (!doc.exists) {
      throw new Error("Teste não encontrado");
    }

    return { id: doc.id, ...doc.data() };
  }
  async listarRespostas(idTeste: string) {
  const snapshot = await db
    .collection("testes")
    .doc(idTeste)
    .collection("respostas")
    .get();

  const respostas = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return respostas;
}
}

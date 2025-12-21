import { db } from "./config/firebase";

async function testFirestore() {
  try {
    const docRef = db.collection("teste").doc("primeiro");
    await docRef.set({
      nome: "Christian",
      criadoEm: new Date().toISOString(),
    });

    const doc = await docRef.get();
    console.log("📄 Documento salvo e lido com sucesso:", doc.data());
  } catch (error) {
    console.error("❌ Erro ao testar Firestore:", error);
  }
}

testFirestore();
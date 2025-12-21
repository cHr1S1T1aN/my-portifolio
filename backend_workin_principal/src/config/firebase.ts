import admin from "firebase-admin";
import serviceAccount from "./";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: "startupwin-9005b.appspot.com", // 🔹 Adicione o bucket do seu projeto aqui
});

const db = admin.firestore();

// 🔹 Exporte tanto o db quanto o admin
export { db, admin };

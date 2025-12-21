import express from "express";
import cors from "cors";
import empresasRouter from "./routes/empresas";
import vagasRouter from "./routes/vagas";
import projetosRouter from "./routes/projetos";
import { db } from "./config/firebase";
import pagamentosRouter from "./routes/pagamento";
import testesrouter from "./routes/testes";
import alunosRouter from "./routes/alunos";
const app = express();

// ✅ CORS configurado corretamente (sem precisar de app.options)
app.use(
  cors({
    origin: [
      "https://pam-noninstrumental-lea.ngrok-free.dev", // seu front atual
      "http://localhost:3000",                           // dev
      "https://projeto-startup.onrender.com",            // backend (auto)
    ],
    credentials: true,
  })
);

// ✅ Middleware padrão
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Rotas principais
app.use("/testes", testesrouter);
app.use("/empresas", empresasRouter);
app.use("/vagas", vagasRouter);
app.use("/projetos", projetosRouter);
app.use("/pagamentos", pagamentosRouter);
app.use("/alunos", alunosRouter);

// ✅ Teste Firebase
app.get("/test-firebase", async (req, res) => {
  try {
    const snapshot = await db.collection("test").get();
    res.json({ size: snapshot.size, message: "Firebase conectado 🚀" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao conectar com o Firebase" });
  }
});

// ✅ Rota padrão
app.get("/", (req, res) => {
  res.send("🚀 API da WorkIn está rodando!");
});

export default app;

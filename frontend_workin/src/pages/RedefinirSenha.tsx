import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Lock, CheckCircle2, AlertCircle } from "lucide-react";

export default function RedefinirSenha() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState<{ tipo: "erro" | "sucesso"; texto: string } | null>(null);
  const [carregando, setCarregando] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!novaSenha || !confirmarSenha) {
      setMensagem({ tipo: "erro", texto: "Preencha todos os campos." });
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMensagem({ tipo: "erro", texto: "As senhas não coincidem." });
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch("https://projeto-startup.onrender.com/empresas/redefinir-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, novaSenha }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem({ tipo: "sucesso", texto: "Senha redefinida com sucesso!" });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMensagem({ tipo: "erro", texto: data.error || "Erro ao redefinir senha." });
      }
    } catch (err) {
      setMensagem({ tipo: "erro", texto: "Erro inesperado. Tente novamente." });
    }

    setCarregando(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200">
      <div className="bg-gray-800/90 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl p-8 w-full max-w-md animate-fadeIn">
        <div className="flex justify-center mb-4">
          <div className="bg-cyan-600/20 p-3 rounded-full">
            <Lock size={36} className="text-cyan-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-center text-white">
          Redefinir Senha
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Crie uma nova senha forte e segura para sua conta
        </p>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          />

          <button
            onClick={handleSubmit}
            disabled={carregando}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-all shadow-lg hover:shadow-cyan-600/30 disabled:opacity-60"
          >
            {carregando ? "Redefinindo..." : "Redefinir Senha"}
          </button>
        </div>

        {mensagem && (
          <div
            className={`mt-5 flex items-center justify-center gap-2 p-3 rounded-lg text-sm border ${
              mensagem.tipo === "sucesso"
                ? "bg-green-500/10 border-green-500/40 text-green-400"
                : "bg-red-500/10 border-red-500/40 text-red-400"
            }`}
          >
            {mensagem.tipo === "sucesso" ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span>{mensagem.texto}</span>
          </div>
        )}
      </div>
    </div>
  );
}

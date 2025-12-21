import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";

export default function RecuperarSenha() {
  const [emailCorporativo, setEmailCorporativo] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailCorporativo) {
      setMensagem({ tipo: "erro", texto: "Digite o e-mail corporativo!" });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://projeto-startup.onrender.com/empresas/esqueci-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailCorporativo }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem({
          tipo: "sucesso",
          texto: "📩 E-mail de recuperação enviado com sucesso!",
        });
        setEmailCorporativo("");
      } else {
        setMensagem({
          tipo: "erro",
          texto: data.message || "Erro ao enviar o e-mail.",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
      setMensagem({ tipo: "erro", texto: "Erro ao conectar com o servidor." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200">
      <div className="bg-gray-800/90 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl p-8 w-full max-w-md animate-fadeIn">
        <div className="flex justify-center mb-4">
          <div className="bg-cyan-600/20 p-3 rounded-full">
            <Mail size={36} className="text-cyan-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Recuperar Senha
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Digite o e-mail corporativo cadastrado e enviaremos um link para redefinir sua senha.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              E-mail Corporativo *
            </label>
            <input
              type="email"
              placeholder="empresa@exemplo.com"
              value={emailCorporativo}
              onChange={(e) => setEmailCorporativo(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-all shadow-lg hover:shadow-cyan-600/30 disabled:opacity-60"
          >
            {loading ? "Enviando..." : "Enviar link"}
          </button>
        </form>

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

        <p className="text-center text-sm mt-6 text-gray-400">
          <Link
            to="/login"
            className="text-cyan-500 hover:text-cyan-400 hover:underline transition"
          >
            ← Voltar para o login
          </Link>
        </p>
      </div>
    </div>
  );
}

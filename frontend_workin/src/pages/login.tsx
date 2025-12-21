import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import IconeWorkin from "../assets/workinicone.png";
import { API_URL } from "../config";

export default function Login() {
  const [mensagem, setMensagem] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(
    null
  );
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [emailCorporativo, setEmailCorporativo] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailCorporativo || !senha) {
      showToast("erro", "Preencha todos os campos!");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/empresas/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailCorporativo, senha }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const { token, empresa } = data;
        if (!token || !empresa) throw new Error("Dados incompletos do servidor!");

        localStorage.setItem("empresaToken", token);
        localStorage.setItem("empresaId", empresa.id);
        localStorage.setItem("empresa", JSON.stringify(empresa));

        showToast("sucesso", "Login realizado com sucesso!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        showToast("erro", data.message || "Credenciais inválidas.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      showToast("erro", "Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (tipo: "sucesso" | "erro", texto: string) => {
    setMensagem({ tipo, texto });
    setTimeout(() => setMensagem(null), 3000);
  };

  return (
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-950 text-gray-200 relative overflow-hidden">
    {/* ===== EFEITO DE FUNDO ===== */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#0891b2_0%,_transparent_40%),radial-gradient(circle_at_bottom_right,_#0e7490_0%,_transparent_40%)] opacity-30"></div>

       {/* ===== LADO ESQUERDO / TOPO NO CELULAR ===== */}
      <div className="w-full md:w-2/5 flex flex-col justify-center items-center text-white z-10 p-8 md:p-0 mt-10 md:mt-0">
        <img src={IconeWorkin} alt="Work-In" className="w-40 md:w-56 mb-6 drop-shadow-lg" />
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Bem-vindo!</h2>
        <p className="text-sm md:text-base text-cyan-100 max-w-xs text-center">
          Faça login em sua conta corporativa e acesse todas as funcionalidades da nossa plataforma.
        </p>
      </div>


      {/* ===== FORMULÁRIO ===== */}
  <div className="w-full md:w-3/5 flex items-center justify-center p-6 md:p-10 z-10">
    <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-2 text-white">Login Corporativo</h2>
      <p className="text-gray-400 text-center mb-6">
        Entre com suas credenciais para acessar o sistema
      </p>

      {/* ===== TOAST ===== */}
      {mensagem && (
        <div
          className={`animate-fade-in-down mb-4 p-3 rounded-lg text-sm text-center font-medium transition-all duration-500 ${
            mensagem.tipo === "sucesso"
              ? "bg-green-500/10 border border-green-600/40 text-green-400"
              : "bg-red-500/10 border border-red-600/40 text-red-400"
          }`}
        >
          {mensagem.texto}
        </div>
      )}

      {/* ===== FORM ===== */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* EMAIL */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">E-mail Corporativo *</label>
          <input
            type="email"
            placeholder="empresa@exemplo.com"
            value={emailCorporativo}
            onChange={(e) => setEmailCorporativo(e.target.value)}
            className="w-full px-4 py-2 bg-gray-950/70 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          />
        </div>

        {/* SENHA */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Senha *</label>
          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 bg-gray-950/70 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-10 transition-all"
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition"
            >
              {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* BOTÃO */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg font-semibold transition-all disabled:opacity-60 shadow-lg"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      {/* LINKS */}
      <p className="text-center text-sm mt-4 text-gray-400">
        Não tem uma conta?{" "}
        <Link to="/cadastro" className="text-cyan-400 font-semibold hover:underline">
          Cadastre sua empresa
        </Link>
      </p>

      <p className="text-center text-sm mt-2">
        <Link to="/esqueci-senha" className="text-gray-400 hover:text-cyan-400 hover:underline">
          Esqueci minha senha
        </Link>
      </p>
    </div>
  </div>

      {/* ===== ANIMAÇÕES ===== */}
      <style>
        {`
          @keyframes fade-in-down {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-down {
            animation: fade-in-down 0.4s ease-out;
          }
        `}
      </style>
    </div>
  );
}
  
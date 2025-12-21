import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Premium() {
  const [avisoTeste, setAvisoTeste] = useState(false);
  const [planoAtual, setPlanoAtual] = useState<string>("padrao");

  useEffect(() => {
    const empresa = JSON.parse(localStorage.getItem("empresa") || "{}");
    if (empresa.plano) {
      setPlanoAtual(empresa.plano);
    }
  }, []);

  const atualizarPlano = (novoPlano: "padrao" | "medio" | "avancado") => {
    const empresa = JSON.parse(localStorage.getItem("empresa") || "{}");
    empresa.plano = novoPlano;
    localStorage.setItem("empresa", JSON.stringify(empresa));
    setPlanoAtual(novoPlano);
    toast.success(`Plano atualizado para ${novoPlano.charAt(0).toUpperCase() + novoPlano.slice(1)}!`);
    setAvisoTeste(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100">
      <main className="flex-grow max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Planos e Assinaturas
        </h1>

        {avisoTeste && (
          <div className="bg-yellow-500/10 border border-yellow-400 text-yellow-300 px-4 py-3 rounded-lg mb-8 text-center font-medium backdrop-blur-sm">
            ⚠️ Modo teste ativo — todos os planos estão liberados temporariamente.
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* PLANO PADRÃO */}
          <div
            className={`rounded-2xl p-8 border ${
              planoAtual === "padrao"
                ? "border-cyan-400 shadow-lg shadow-cyan-500/10"
                : "border-neutral-800"
            } bg-neutral-900/70 backdrop-blur-sm transition-transform hover:-translate-y-1`}
          >
            <h2 className="text-2xl font-semibold text-center text-gray-100 mb-2 mt-8">
              Plano Padrão
            </h2>
            <p className="text-center text-gray-400 font-medium mb-4">R$ 0,00/mês</p>
            <ul className="text-gray-400 space-y-3 mb-6">
              <li>• Crie uma vaga de teste</li>
              <li>• Veja candidatos inscritos</li>
              <li>• Ideal para pequenas empresas</li>
            </ul>
            <button
              onClick={() => atualizarPlano("padrao")}
              className="w-full bg-gray-800 hover:bg-gray-700 text-gray-100 font-semibold py-2 rounded-lg transition mt-2"
            >
              {planoAtual === "padrao" ? "Plano Atual" : "Selecionar"}
            </button>
          </div>

          {/* PLANO MÉDIO */}
          <div
            className={`rounded-2xl p-8 border ${
              planoAtual === "medio"
                ? "border-cyan-400 shadow-lg shadow-cyan-500/20"
                : "border-neutral-800"
            } bg-neutral-900/70 backdrop-blur-sm transition-transform hover:-translate-y-1`}
          >
            <span className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
              ⭐ Mais Popular
            </span>
            <h2 className="text-2xl font-semibold text-center text-gray-100 mb-2 mt-5">
              Plano Médio
            </h2>
            
            <p className="text-center text-cyan-400 font-medium mb-9">R$ 49,00/mês</p>
            <ul className="text-gray-400 space-y-3 mb-6">
              <li>• Crie vagas ilimitadas</li>
              <li>• Vagas urgentes com destaque</li>
              <li>• Envio direto para candidatos ideais</li>
            </ul>
            <button
              onClick={() => atualizarPlano("medio")}
              disabled={planoAtual === "medio"}
              className={`w-full py-2 rounded-lg font-semibold transition ${
                planoAtual === "medio"
                  ? "bg-cyan-500/20 text-cyan-300 cursor-default"
                  : "bg-cyan-500 hover:bg-cyan-600 text-white"
              }`}
            >
              {planoAtual === "medio" ? "Plano Atual" : "Selecionar"}
            </button>
          </div>

          {/* PLANO AVANÇADO */}
          <div
            className={`rounded-2xl p-8 border relative ${
              planoAtual === "avancado"
                ? "border-yellow-400 shadow-lg shadow-yellow-500/20"
                : "border-neutral-800"
            } bg-neutral-900/70 backdrop-blur-sm transition-transform hover:-translate-y-1`}
          >
            
            <h2 className="text-2xl font-semibold text-center text-gray-100 mb-2">
              Plano Avançado
            </h2>
            <p className="text-center text-yellow-400 font-medium mb-4">R$ 99,00/mês</p>
            <ul className="text-gray-400 space-y-3 mb-6">
              <li>• Todos os benefícios anteriores</li>
              <li>• Crie projetos e desafios práticos</li>
              <li>• Destaque da empresa no ranking</li>
              <li>• Suporte prioritário e relatórios</li>
            </ul>
            <button
              onClick={() => atualizarPlano("avancado")}
              disabled={planoAtual === "avancado"}
              className={`w-full py-2 rounded-lg font-semibold transition ${
                planoAtual === "avancado"
                  ? "bg-yellow-500/20 text-yellow-300 cursor-default"
                  : "bg-yellow-400 hover:bg-yellow-500 text-black"
              }`}
            >
              {planoAtual === "avancado" ? "Plano Atual" : "Selecionar"}
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/dashboard"
            className="text-cyan-400 hover:text-cyan-300 font-medium transition"
          >
            ← Voltar ao Painel
          </Link>
        </div>
      </main>
    </div>
  );
}
  
import { Link } from "react-router-dom";

export default function Avaliacao() {
  const vagaId = localStorage.getItem("vagaSelecionada");
  console.log("🔍 Vaga ID recuperado:", vagaId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100 px-6 py-12 relative overflow-hidden">
      {/* fundo decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none"></div>

      <main className="flex-grow max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-12">
          Crie um teste para sua vaga
        </h1>

        {/* Blocos principais */}
        <div className="space-y-12">
          {/* Grid com Prova Padrão e Projeto */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Prova Padrão */}
            <div className="bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-2xl shadow-lg p-8 transition hover:-translate-y-1 hover:shadow-cyan-500/10">
              <h2 className="text-2xl font-semibold text-cyan-300 mb-2">Prova Padrão</h2>
              <p className="text-gray-400 mb-4">
                Crie para conhecer um pouco mais do candidato.
                <br />
                Prova escrita ou múltipla escolha.
              </p>
              <Link
                to="/avaliacao/prova"
                className="inline-block px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition"
              >
                Criar agora
              </Link>
            </div>

            {/* Projeto Prático */}
            <div className="bg-neutral-900/70 backdrop-blur-sm border border-yellow-400 rounded-2xl shadow-lg p-8 transition hover:-translate-y-1 hover:shadow-yellow-500/10 relative">
              <span className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                ⭐ Recomendado
              </span>
              <h2 className="text-2xl font-semibold text-yellow-400 mb-2">Projeto</h2>
              <p className="text-gray-400 mb-4">
                Crie projetos públicos ou individuais para testar os candidatos de forma prática.
              </p>
              <Link
                to="/avaliacao/projeto"
                className="inline-block px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                Criar agora
              </Link>
            </div>
          </div>

          {/* Gerenciar Testes */}
          <div className="bg-neutral-900/70 backdrop-blur-sm border border-emerald-500 rounded-2xl shadow-lg p-8 transition hover:-translate-y-1 hover:shadow-emerald-500/10">
            <h2 className="text-2xl font-semibold text-emerald-300 mb-2">Gerenciar Testes</h2>
            <p className="text-gray-400 mb-4">
              Veja os testes e projetos que você já criou para suas vagas.
            </p>
            <Link
              to="/gerenciar-testes"
              className="inline-block px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 hover:shadow-[0_0_10px_rgba(16,185,129,0.5)] transition"
            >
              Gerenciar testes
            </Link>
          </div>
        </div>

        {/* Voltar */}
        <div className="text-center mt-16">
          <Link
            to="/dashboard"
            className="text-cyan-400 hover:text-cyan-300 underline font-medium transition"
          >
            Voltar ao início
          </Link>
        </div>
      </main>
    </div>
  );
}

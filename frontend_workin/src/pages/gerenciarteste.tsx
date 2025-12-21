import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function GerenciarTestes() {
  const [vagas, setVagas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const empresa = JSON.parse(localStorage.getItem("empresa") || "{}");
    const token = localStorage.getItem("empresaToken");

    const carregarVagasComProjetos = async () => {
      try {
        const res = await fetch(`https://projeto-startup.onrender.com/vagas/empresa/${empresa.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const vagasAtivas = (data.vagas || []).filter((vaga: any) => vaga.ativa !== false);

        const vagasComTestes = await Promise.all(
          vagasAtivas.map(async (vaga: any) => {
            try {
              const resTestes = await fetch(`https://projeto-startup.onrender.com/testes/vaga/${vaga.id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              const dataTestes = await resTestes.json();
              return { ...vaga, testes: dataTestes.testes || [] };
            } catch (err) {
              console.error("Erro ao buscar testes da vaga:", vaga.id, err);
              return { ...vaga, testes: [] };
            }
          })
        );

        setVagas(vagasComTestes);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar vagas:", err);
        setLoading(false);
      }
    };

    carregarVagasComProjetos();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100">
        <p className="text-center mt-20">Carregando vagas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100 px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none"></div>

      <header className="text-center mb-14 relative z-10">
        <h1 className="text-5xl font-extrabold text-cyan-400">Gerenciar Testes</h1>
        <p className="text-gray-400 mt-2">Veja os tipos de testes vinculados às suas vagas</p>
      </header>

      <main className="flex flex-col items-center gap-8 relative z-10">
        {vagas.length === 0 ? (
          <p className="text-gray-400 text-center">Nenhuma vaga ativa encontrada.</p>
        ) : (
          vagas.map((vaga) => {
            const temProva = vaga.testes?.some(
              (t: any) => t.tipo === "prova" || t.perguntas?.length > 0
            );
            const temProjeto = vaga.testes?.some(
              (t: any) => t.tipo === "projeto" || t.projeto || t.temProjetoPratico
            );

            return (
              <section
                key={vaga.id}
                className="bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-2xl shadow-lg w-full max-w-3xl p-8 transition hover:-translate-y-1 hover:shadow-cyan-500/10 group"
              >
                
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-100 group-hover:text-cyan-400 transition">
                      {vaga.titulo}
                    </h2>
                    <p className="text-sm text-gray-500">{vaga.areaProfissional}</p>
                  </div>
                  <span className="bg-emerald-900/50 text-emerald-300 px-3 py-1 rounded-lg text-sm font-medium">
                    Vaga Ativa
                  </span>

                {/* Exibe apenas se houver testes */}
                {(temProva || temProjeto) && (
                  <div className="flex flex-wrap gap-3 mt-2">
                    {temProva && (
                      <span className="bg-cyan-900/40 text-cyan-300 px-3 py-1 rounded-full text-sm border border-cyan-800">
                        📝 Teste com perguntas
                      </span>
                    )}
                    {temProjeto && (
                      <span className="bg-amber-900/40 text-amber-300 px-3 py-1 rounded-full text-sm border border-amber-800">
                        🧩 Projeto prático
                      </span>
                    )}
                  </div>
                )}

                <footer className="flex justify-end mt-6 border-t border-neutral-800 pt-4">
                  <Link
                    to={`/vaga/${vaga.id}/testes`}
                    className="text-cyan-400 hover:text-cyan-300 font-medium text-sm"
                  >
                    Ver detalhes dos testes →
                  </Link>
                </footer>
              </section>
            );
          })
        )}
      </main>
    </div>
  );
}

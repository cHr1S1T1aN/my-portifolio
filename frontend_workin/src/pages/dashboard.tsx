import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Pencil, Star } from "lucide-react";
import mascote from "../assets/mascotebracocruzado.png";

export default function Dashboard() {
  const [vagas, setVagas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const empresa = JSON.parse(localStorage.getItem("empresa") || "{}");
  const planoAtual = empresa.plano || "padrao";
  const carregarVagas = async () => {
    try {
      const empresaId = empresa.id;
      const token = localStorage.getItem("empresaToken");

      if (!empresaId || !token) {
        console.warn("⚠️ Nenhuma empresa logada");
        setVagas([]);
        return;
      }

      const response = await fetch(
      `https://projeto-startup.onrender.com/vagas/empresa/${empresaId}`, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

      const data = await response.json();
      const vagasAtivas = (data.vagas || []).filter((vaga: any) => vaga.ativa !== false);
      setVagas(vagasAtivas);
    } catch (error) {
      console.error("❌ Erro ao carregar vagas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarVagas();
  }, [location.pathname]);

  const finalizarVaga = async (id: string) => {
  const token = localStorage.getItem("empresaToken");
  try {
    await fetch(`https://projeto-startup.onrender.com/vagas/${id}/finalizar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    await carregarVagas();
  } catch (err) {
    console.error("Erro ao finalizar vaga:", err);
  }
};


  const corPlano =
    planoAtual === "avancado"
      ? "text-yellow-400"
      : planoAtual === "medio"
      ? "text-cyan-400"
      : "text-gray-400";

  const nomePlano = planoAtual.charAt(0).toUpperCase() + planoAtual.slice(1);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100">
        <p className="text-center mt-20">Carregando vagas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100 px-6 py-12 relative overflow-hidden">
      {/* fundo decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none"></div>

      {/* HEADER */}
          <header className="text-center mb-14 relative z-10">
      <h1 className="text-5xl font-extrabold text-cyan-400">
        Painel de Vagas
      </h1>
      <p className="text-gray-400 mt-2">
        Empresa:{" "}
        <span className="font-semibold text-gray-200">
          {empresa.nomeEmpresa || "Empresa não informada"}
        </span>
      </p>
      <p className="text-sm text-gray-500 mt-1">
        Plano atual: <span className={`font-semibold ${corPlano}`}>{nomePlano}</span>
      </p>
    </header>

      <main className="flex flex-col items-center gap-8 relative z-10">
        {vagas.length === 0 ? (
          <div className="flex flex-col items-center gap-4 bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-2xl shadow-lg w-full max-w-3xl p-8 hover:shadow-cyan-500/10 transition">
            <img
              src={mascote}
              alt="Mascote Workin"
              className="w-44 animate-float drop-shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            />
            <h2 className="text-2xl font-semibold text-gray-100">Nenhuma vaga cadastrada</h2>
            <p className="text-gray-400 text-center">
              Crie sua primeira vaga e comece a receber candidatos agora mesmo!
            </p>
            <Link
              to="/criar-vaga"
              className="mt-4 bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition"
            >
              Criar Vaga
            </Link>
          </div>
        ) : (
          vagas.map((vaga) => (
            <section
              key={vaga.id}
              className="bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-2xl shadow-lg w-full max-w-3xl p-8 transition hover:-translate-y-1 hover:shadow-cyan-500/10"
            >
              <div className="flex justify-between items-center border-b border-neutral-800 pb-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-neutral-800 rounded-full p-3">
                   
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-100">
                      {vaga.areaProfissional || "Área não informada"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {empresa.nomeEmpresa || "Empresa não informada"}
                    </p>
                  </div>
                </div>

                <span className="bg-emerald-900/50 text-emerald-300 px-3 py-1 rounded-lg text-sm font-medium">
                  Em Aberto
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-cyan-300">
                  {vaga.titulo || "Título não informado"}
                </h3>

                <div>
                  <h4 className="text-gray-300 font-medium mb-2">Requisitos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {vaga.requisitos?.length > 0 ? (
                      vaga.requisitos.map((req: string, i: number) => (
                        <span
                          key={i}
                          className="bg-cyan-900/40 text-cyan-300 px-3 py-1 rounded-full text-sm border border-cyan-800"
                        >
                          {req}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-600 text-sm">Nenhum requisito informado</span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-gray-300 font-medium">Salário:</h4>
                  <p className="text-gray-400">{vaga.faixaSalarial || "A combinar"}</p>
                </div>

                <div>
                  <h4 className="text-gray-300 font-medium mb-1">Descrição:</h4>
                  <p className="text-gray-400 text-sm border border-neutral-800 rounded-lg p-3 bg-neutral-950/70">
                    {vaga.descricao || "Sem descrição fornecida"}
                  </p>
                </div>

                {vaga.beneficios?.length > 0 && (
                  <div>
                    <h4 className="text-gray-300 font-medium mb-2">Benefícios:</h4>
                    <div className="flex flex-wrap gap-2">
                      {vaga.beneficios.map((b: string, i: number) => (
                        <span
                          key={i}
                          className="bg-emerald-900/40 text-emerald-300 px-3 py-1 rounded-full text-sm border border-emerald-800"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {vaga.vagaUrgente && (
                  <p className="text-yellow-400 font-semibold flex items-center gap-2 mt-3">
                    <Star size={16} /> Vaga urgente!
                  </p>
                )}
              </div>

              <footer className="flex items-center justify-between mt-8 border-t border-neutral-800 pt-4">
                <Link
                  to={`/editar-vaga/${vaga.id}`}
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition font-medium"
                >
                  <Pencil size={18} /> Editar vaga
                </Link>

                <button
                  onClick={() => finalizarVaga(vaga.id)}
                  className="bg-red-900/40 text-red-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-900/70 transition"
                >
                  Finalizar vaga
                </button>
              </footer>
            </section>
          ))
        )}
      </main>

      {/* animação flutuante do mascote */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

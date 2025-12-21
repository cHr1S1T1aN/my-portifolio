import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
interface Candidatura {
  candidatoId: string;
  vagaId?: string;
  status?: string;
  dataCandidatura?: {
    _seconds: number;
    _nanoseconds: number;
  };
  nomeCandidato?: string;
  nomeVaga?: string;
  alunoId?: string;
}

export default function Notificacoes() {
  const [candidatos, setCandidatos] = useState<Candidatura[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"candidatos" | "sistema">("candidatos");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCandidatos = async () => {
      try {
        const res = await fetch("https://projeto-startup.onrender.com/empresas/candidaturas", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();

        if (data.success) {
          setCandidatos(data.candidaturas);
        }
      } catch (error) {
        console.error("❌ Erro ao carregar candidatos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidatos();
  }, [token]);

  if (loading) {
    return <p className="text-gray-400">Carregando notificações...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100 px-6 py-12 relative overflow-hidden">
      {/* fundo decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none"></div>

      <main className="max-w-5xl mx-auto relative z-10">
        {/* título principal */}
        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-10">
          Notificações
        </h1>

        {/* botões de alternância */}
        <div className="flex justify-center gap-6 mb-10">
          <button
            onClick={() => setActiveTab("candidatos")}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              activeTab === "candidatos"
                ? "bg-cyan-500 text-white shadow-lg"
                : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
            }`}
          >
            👤 Candidatos
          </button>
          <button
            onClick={() => setActiveTab("sistema")}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              activeTab === "sistema"
                ? "bg-green-500 text-white shadow-lg"
                : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
            }`}
          >
            ⚙️ Sistema
          </button>
        </div>

        {/* conteúdo */}
        {activeTab === "candidatos" ? (
          candidatos.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum candidato encontrado.</p>
          ) : (
            <ul className="space-y-6">
              {candidatos.map((c) => (
                <li
                  key={c.candidatoId}
                  className="bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-2xl shadow-lg p-6 transition hover:-translate-y-1 hover:shadow-cyan-500/10"
                >
                  <h2 className="text-xl font-semibold text-cyan-300">
                    {c.nomeCandidato || c.alunoId}
                  </h2>
                  <p className="text-gray-400">Vaga: {c.nomeVaga || c.vagaId}</p>
                  <p className="text-gray-400">Status: {c.status}</p>
                  {c.dataCandidatura && (
                    <p className="text-gray-500 text-sm">
                      Data: {new Date(c.dataCandidatura._seconds * 1000).toLocaleString("pt-BR")}
                    </p>
                  )}

                  <div className="mt-4">   
                    <Link
                      to={`/candidato/${c.alunoId}`}
                      className="mt-3 inline-block px-4 py-2 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition"
                    >
                      📄 Ver currículo
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )
        ) : (
          <div className="bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-2xl shadow-lg p-6 text-center">
            <p className="text-gray-400">Nenhuma notificação do sistema no momento.</p>
          </div>
        )}
      </main>
    </div>
  );
}

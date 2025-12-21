import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Code, ClipboardList } from "lucide-react";

export default function TestesDaVaga() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testes, setTestes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  //const {alunoId } = useParams<{ id: string; alunoId: string }>();


  useEffect(() => {
  const token = localStorage.getItem("empresaToken");

  fetch(`https://projeto-startup.onrender.com/testes/vaga/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(async (res) => {
      if (!res.ok) {
        const t = await res.text();
        throw new Error("Erro ao buscar testes: " + t);
      }
      return res.json();
    })
    .then((data) => {
      const testesNormalizados = (data.testes || []).map((t: any) => ({
        ...t,
        dissertativas: t.dissertativas || [],
        multiplaEscolha: t.multiplaEscolha || [],
        projeto: t.projeto || null,
      }));
      setTestes(testesNormalizados);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
      alert("Não foi possível carregar os testes da vaga.");
    });
}, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100 px-6 py-12 relative overflow-hidden">
      {/* fundo decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none"></div>

      <main className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-10">
          Testes vinculados à vaga
        </h1>

        {loading ? (
          <p className="text-center text-gray-400">Carregando testes…</p>
        ) : testes.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhum teste cadastrado para esta vaga.
          </p>
        ) : (
          <ul className="space-y-8">
            {testes.map((teste, i) => {
              const isProjeto = !!teste.projeto;
              const tipo = isProjeto ? "Projeto prático" : "Prova de conhecimentos";
              const Icon = isProjeto ? Code : ClipboardList;
              const cor = isProjeto ? "text-yellow-400" : "text-cyan-400";
              const border = isProjeto ? "border-yellow-400" : "border-cyan-400";

              return (
                <li
                  key={i}
                  className={`bg-neutral-900/70 backdrop-blur-sm ${border} rounded-2xl shadow-lg p-6 transition hover:-translate-y-1 hover:shadow-cyan-500/10`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-100">
                      <Icon className={`${cor}`} size={22} />
                      {tipo}
                    </h2>
                    <span className="text-xs text-gray-500">
                      ID: {teste.id || i + 1}
                    </span>
                  </div>

                  {isProjeto ? (
                    <>
                      <p className="text-gray-300 font-medium mb-1">
                        {teste.projeto?.titulo || "Projeto sem título"}
                      </p>
                      <p className="text-sm text-gray-400 mb-2">
                        {teste.projeto?.descricao || "Sem descrição fornecida."}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-400 mb-1">
                        Perguntas Disserta: {teste.dissertativas.length}
                      </p>
                      <p className="text-sm text-gray-400 mb-1">
                        Perguntas objetivas: {teste.multiplaEscolha.length}
                      </p>
                    </>
                  )}

                  <p className="text-sm text-gray-400 mb-3">
                    Prazo:{" "}
                    <span className="font-medium text-gray-200">
                      {teste.prazo || "Não definido"}
                    </span>
                  </p>

                  <div className="flex flex-wrap gap-4 mt-3">
                    <button
                    onClick={() => navigate(`/resultados/${teste.id}`)}
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition"
                  >
                    Ver resultados
                  </button>







                    <button
                      onClick={() => navigate(`/teste/${teste.id}/editar`)}
                      className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition"
                    >
                      Editar teste
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}

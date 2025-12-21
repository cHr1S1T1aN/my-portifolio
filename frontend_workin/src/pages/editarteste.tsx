import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type MultiplaEscolha = { pergunta: string; opcoes: string[] };
type Projeto = { titulo: string; descricao: string; entrega: string };

export default function EditarTeste() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tipo, setTipo] = useState<"prova" | "projeto" | null>(null);
  const [dissertativas, setDissertativas] = useState<string[]>([]);
  const [multiplaEscolha, setMultiplaEscolha] = useState<MultiplaEscolha[]>([]);
  const [prazo, setPrazo] = useState("");
  const [vagaId, setVagaId] = useState("");
  const [projeto, setProjeto] = useState<Projeto>({
    titulo: "",
    descricao: "",
    entrega: "",
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("empresaToken");

    fetch(`https://projeto-startup.onrender.com/testes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setDissertativas(data.dissertativas || []);
        setMultiplaEscolha(data.multiplaEscolha || []);
        setPrazo(data.prazo || "");
        setVagaId(data.vagaId || "");
        setProjeto(data.projeto || { titulo: "", descricao: "", entrega: "" });

        if (data.projeto && (data.projeto.titulo || data.projeto.descricao || data.projeto.entrega)) {
          setTipo("projeto");
        } else {
          setTipo("prova");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar teste:", err);
        setLoading(false);
      });
  }, [id]);

  const salvarEdicao = async () => {
    const token = localStorage.getItem("empresaToken");
    if (!token) return alert("Token não encontrado.");

    const testeAtualizado =
      tipo === "projeto"
        ? { tipo, projeto, prazo }
        : { tipo, dissertativas, multiplaEscolha, prazo };

    try {
      const response = await fetch(`https://projeto-startup.onrender.com/testes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(testeAtualizado),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro ao salvar:", errorText);
        alert("Erro ao salvar teste.");
        return;
      }

      navigate(`/vaga/${vagaId}/testes`);
    } catch (err) {
      console.error("Erro ao salvar teste:", err);
      alert("Erro ao salvar teste.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-400 mt-12">Carregando teste…</p>;
  }

  if (!tipo) {
    return <p className="text-center text-red-400 mt-12">Tipo de teste desconhecido.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-neutral-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-neutral-800 p-10">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-cyan-400 mb-2">
            Editar {tipo === "projeto" ? "Projeto Prático" : "Prova"}
          </h1>
          <p className="text-gray-400 text-sm">Ajuste as informações abaixo e salve suas alterações.</p>
        </header>

        {/* === PROVA === */}
        {tipo === "prova" && (
          <>
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-cyan-300 mb-4">Perguntas dissertativas</h2>
              <div className="space-y-4">
                {dissertativas.map((q, i) => (
                  <div
                    key={i}
                    className="bg-neutral-800/70 p-4 rounded-xl border border-neutral-700 hover:border-cyan-700 transition"
                  >
                    <input
                      type="text"
                      value={q}
                      onChange={(e) =>
                        setDissertativas((prev) => {
                          const novas = [...prev];
                          novas[i] = e.target.value;
                          return novas;
                        })
                      }
                      className="w-full bg-transparent border-b border-neutral-600 p-2 text-gray-200 focus:border-cyan-500 focus:outline-none"
                      placeholder="Digite a pergunta dissertativa"
                    />
                    <button
                      type="button"
                      onClick={() => setDissertativas((prev) => prev.filter((_, index) => index !== i))}
                      className="text-red-400 text-sm mt-2 hover:text-red-300"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setDissertativas((prev) => [...prev, ""])}
                className="mt-6 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition"
              >
                + Adicionar pergunta dissertativa
              </button>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-cyan-300 mb-4">Perguntas de múltipla escolha</h2>
              {multiplaEscolha.map((item, i) => (
                <div
                  key={i}
                  className="mb-6 bg-neutral-800/70 p-5 rounded-xl border border-neutral-700 hover:border-cyan-700 transition"
                >
                  <input
                    type="text"
                    placeholder="Pergunta"
                    value={item.pergunta}
                    onChange={(e) =>
                      setMultiplaEscolha((prev) => {
                        const novas = [...prev];
                        novas[i] = { ...novas[i], pergunta: e.target.value };
                        return novas;
                      })
                    }
                    className="w-full bg-transparent border-b border-neutral-600 p-2 mb-3 text-gray-200 focus:border-cyan-500 focus:outline-none"
                  />
                  {item.opcoes.map((op, j) => (
                    <input
                      key={j}
                      type="text"
                      placeholder={`Opção ${j + 1}`}
                      value={op}
                      onChange={(e) =>
                        setMultiplaEscolha((prev) => {
                          const novas = [...prev];
                          novas[i].opcoes[j] = e.target.value;
                          return novas;
                        })
                      }
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 mb-2 text-gray-300 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => setMultiplaEscolha((prev) => prev.filter((_, index) => index !== i))}
                    className="text-red-400 text-sm hover:text-red-300"
                  >
                    Remover pergunta
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setMultiplaEscolha((prev) => [...prev, { pergunta: "", opcoes: ["", ""] }])
                }
                className="mt-6 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition"
              >
                + Adicionar pergunta de múltipla escolha
              </button>
            </section>
          </>
        )}

        {/* === PROJETO === */}
        {tipo === "projeto" && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">Informações do Projeto</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Título do projeto"
                value={projeto.titulo}
                onChange={(e) => setProjeto({ ...projeto, titulo: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-gray-200 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
              />
              <textarea
                placeholder="Descrição detalhada"
                value={projeto.descricao}
                onChange={(e) => setProjeto({ ...projeto, descricao: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-gray-200 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
                rows={4}
              />
            </div>
          </section>
        )}

        {/* === PRAZO === */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-cyan-300 mb-4">Prazo de entrega / resposta</h2>
          <input
            type="date"
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-gray-200 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
          />
        </section>

        <div className="text-center">
          <button
            onClick={salvarEdicao}
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 transition text-white rounded-xl shadow-lg font-medium"
          >
             Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}

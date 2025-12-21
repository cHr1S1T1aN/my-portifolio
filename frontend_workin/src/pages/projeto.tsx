import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HelpCircle } from "lucide-react"; // ícone de ajuda

export default function CriarProjeto() {
  const navigate = useNavigate();
  const token = localStorage.getItem("empresaToken");
  const empresa = JSON.parse(localStorage.getItem("empresa") || "{}");

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [entrega, setEntrega] = useState("");
  const [vagaId, setVagaId] = useState("");
  const [vagas, setVagas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`https://projeto-startup.onrender.com/vagas/empresa/${empresa.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const vagasAtivas = (data.vagas || []).filter((v: any) => v.ativa !== false);
        setVagas(vagasAtivas);
      })
      .catch((err) => {
        console.error("Erro ao carregar vagas:", err);
      });
  }, [empresa.id, token]);

  const salvarProjeto = async () => {
    if (!titulo || !descricao || !entrega || !vagaId) {
      alert("Preencha todos os campos.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("https://projeto-startup.onrender.com/testes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vagaId,
          prazo: entrega,
          projeto: {
            titulo,
            descricao,
            entrega,
          },
        }),
      });

      if (!response.ok) throw new Error("Erro ao salvar projeto");

      navigate(`/vaga/${vagaId}/testes`);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar projeto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100 px-6 py-12 relative overflow-hidden">
      {/* fundo decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(250,204,21,0.1),transparent_70%)] pointer-events-none"></div>

      <main className="flex-grow max-w-3xl mx-auto relative z-10">
        {/* Header com título centralizado e ícone à direita */}
        <div className="relative mb-12">
        <h1 className="text-3xl font-bold text-yellow-400 text-center">
            Criar Projeto Prático
        </h1>
        <Link
            to="/ajuda-projetos"
            className=" absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition"
            title="Como funcionam os projetos?"
        >
            <HelpCircle size={28} />
        </Link>
        </div>

        <div className="bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-2xl shadow-lg p-8 space-y-6">
          {/* Seletor de vaga */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Vaga vinculada
            </label>
            <select
              value={vagaId}
              onChange={(e) => setVagaId(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-gray-100 focus:ring-2 focus:ring-yellow-400 outline-none"
            >
              <option value="">Selecione uma vaga</option>
              {vagas.map((vaga) => (
                <option key={vaga.id} value={vaga.id}>
                  {vaga.titulo} — {vaga.areaProfissional}
                </option>
              ))}
            </select>
          </div>

          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Título do projeto
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Criar uma landing page"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-gray-100 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Descrição do projeto
            </label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Explique o desafio, requisitos e critérios de avaliação..."
              rows={6}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-gray-100 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* Prazo */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Prazo de entrega
            </label>
            <input
              type="date"
              value={entrega}
              onChange={(e) => setEntrega(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-gray-100 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          <div className="text-center pt-4">
            <button
              onClick={salvarProjeto}
              disabled={loading}
              className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-500 hover:shadow-[0_0_10px_rgba(250,204,21,0.5)] disabled:opacity-50 transition"
            >
              {loading ? "Salvando..." : "Salvar projeto"}
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/avaliacao")}
            className="text-yellow-400 hover:text-yellow-300 underline font-medium transition"
          >
            Voltar à seleção de testes
          </button>
        </div>
      </main>
    </div>
  );
}

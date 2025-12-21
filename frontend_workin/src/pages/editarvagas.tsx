import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditarVaga() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vaga, setVaga] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [novoRequisito, setNovoRequisito] = useState("");
  const [novoBeneficio, setNovoBeneficio] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("empresaToken");

    fetch(`https://projeto-startup.onrender.com/vagas/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setVaga(data.vaga);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setVaga((prev: any) => ({ ...prev, [name]: val }));
  };

  // --- REQUISITOS ---
  const adicionarRequisito = () => {
    if (!novoRequisito.trim()) return;

    setVaga((prev: any) => ({
      ...prev,
      requisitos: [...(prev.requisitos || []), novoRequisito.trim()],
    }));

    setNovoRequisito("");
  };
  const [toast, setToast] = useState("");
  const removerRequisito = (i: number) => {
    setVaga((prev: any) => ({
      ...prev,
      requisitos: prev.requisitos.filter((_: any, index: number) => index !== i),
    }));
  };

  // --- BENEFÍCIOS ---
  const adicionarBeneficio = () => {
    if (!novoBeneficio.trim()) return;

    setVaga((prev: any) => ({
      ...prev,
      beneficios: [...(prev.beneficios || []), novoBeneficio.trim()],
    }));

    setNovoBeneficio("");
  };

  const removerBeneficio = (i: number) => {
    setVaga((prev: any) => ({
      ...prev,
      beneficios: prev.beneficios.filter((_: any, index: number) => index !== i),
    }));
  };

  // --- SALVAR ---
  const salvarEdicao = async () => {
  const token = localStorage.getItem("empresaToken");

  await fetch(`https://projeto-startup.onrender.com/vagas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(vaga),
  });

  setToast("Alterações concluídas!");

  setTimeout(() => {
    setToast("");
    navigate("/dashboard");
  }, 1500);
};

  // --- LOADING ---
  if (loading || !vaga) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100">
        <p className="text-center mt-20">Carregando vaga...</p>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100 px-6 py-12 relative overflow-hidden">
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-cyan-600 text-white px-6 py-3 rounded-xl shadow-lg z-[999] animate-fade">
          {toast}
        </div>
      )}
      {/* fundo decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none"></div>

      {/* CARD */}
      <div className="w-full max-w-xl mx-auto px-3 sm:px-8 bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-2xl shadow-lg p-8 relative z-10">

       <h2 className="text-3xl font-bold mb-6 text-cyan-400 text-center"> Editar Vaga </h2>

        <div className="space-y-4">

          <input
            name="titulo"
            value={vaga.titulo}
            onChange={handleChange}
            placeholder="Título"
            className="w-full border border-neutral-700 bg-neutral-950/70 text-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-cyan-500"
          />

          <textarea
            name="descricao"
            value={vaga.descricao}
            onChange={handleChange}
            placeholder="Descrição"
            className="w-full border border-neutral-700 bg-neutral-950/70 text-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-cyan-500"
          />

          <input
            name="areaProfissional"
            value={vaga.areaProfissional}
            onChange={handleChange}
            placeholder="Área profissional"
            className="w-full border border-neutral-700 bg-neutral-950/70 text-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-cyan-500"
          />

          <input
            name="faixaSalarial"
            value={vaga.faixaSalarial}
            onChange={handleChange}
            placeholder="Faixa salarial"
            className="w-full border border-neutral-700 bg-neutral-950/70 text-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-cyan-500"
          />

          <input
            name="modalidade"
            value={vaga.modalidade}
            onChange={handleChange}
            placeholder="Modalidade"
            className="w-full border border-neutral-700 bg-neutral-950/70 text-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-cyan-500"
          />

          <input
            name="tipoContrato"
            value={vaga.tipoContrato}
            onChange={handleChange}
            placeholder="Tipo de contrato"
            className="w-full border border-neutral-700 bg-neutral-950/70 text-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-cyan-500"
          />

          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              name="vagaUrgente"
              checked={vaga.vagaUrgente}
              onChange={handleChange}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-600 rounded"
            />
            <span>Vaga urgente</span>
          </label>

          <input
            name="dataLimite"
            type="date"
            value={vaga.dataLimite?.split("T")[0] || ""}
            onChange={handleChange}
            className="w-full border border-neutral-700 bg-neutral-950/70 text-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-cyan-500"
          />

          <input
            name="teste"
            value={vaga.teste || ""}
            onChange={handleChange}
            placeholder="Teste (opcional)"
            className="w-full border border-neutral-700 bg-neutral-950/70 text-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-cyan-500"
          />

          {/* --- REQUISITOS --- */}
          <div>
            <label className="font-semibold text-gray-200">Requisitos:</label>

            <div className="flex gap-3 mt-2">
              <input
                value={novoRequisito}
                onChange={(e) => setNovoRequisito(e.target.value)}
                placeholder="Novo requisito"
                className="w-40 flex-1 border border-neutral-700 bg-neutral-950/70 text-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-cyan-500"
              />
              <button
                onClick={adicionarRequisito}
                className="bg-cyan-600 text-white px-4 py-3 rounded-lg w-28 text-center active:scale-95 transition shadow-md"
              >
                Adicionar
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {vaga.requisitos?.map((req: string, i: number) => (
                <span
                  key={i}
                  className="bg-cyan-900/40 text-cyan-300 px-3 py-1 rounded-full text-sm border border-cyan-800 flex items-center gap-2"
                >
                  {req}
                  <button
                    type="button"
                    onClick={() => removerRequisito(i)}
                    className="text-red-400 font-bold hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* --- BENEFÍCIOS --- */}
          <div>
            <label className="font-semibold text-gray-200">Benefícios:</label>

            <div className="flex gap-3 mt-2">
              <input
                value={novoBeneficio}
                onChange={(e) => setNovoBeneficio(e.target.value)}
                placeholder="Novo benefício"
                className="w-40 flex-1 border border-neutral-700 bg-neutral-950/70 text-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-cyan-500"
              />
              <button
                onClick={adicionarBeneficio}
                className="bg-cyan-600 text-white px-4 py-3 rounded-lg w-28 text-center active:scale-95 transition shadow-md"
              >
                Adicionar
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {vaga.beneficios?.map((b: string, i: number) => (
                <span
                  key={i}
                  className="bg-emerald-900/40 text-emerald-300 px-3 py-1 rounded-full text-sm border border-emerald-800 flex items-center gap-2"
                >
                  {b}
                  <button
                    type="button"
                    onClick={() => removerBeneficio(i)}
                    className="text-red-400 font-bold hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* BOTÃO FINAL */}
       <button
        onClick={salvarEdicao}
        className="mt-8 w-full bg-cyan-600 text-white px-6 py-4 rounded-xl text-lg font-semibold shadow-lg active:scale-[0.97] transition"
      >
        Salvar alterações
      </button>
      </div>
    </div>
  );
}

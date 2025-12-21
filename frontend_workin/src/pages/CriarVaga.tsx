import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CriarVaga() {
  const navigate = useNavigate();
  const empresa = JSON.parse(localStorage.getItem("empresa") || "{}");
  const plano = empresa.plano || "padrao";
  const areas = [
    'Saúde',
    'Tecnologia da Informação',
    'Educação',
    'Administração',
    'Engenharia',
    'Design',
    'Marketing',
    'Direito',
    'Contabilidade',
    'Recursos Humanos',
    'Comunicação / Jornalismo',
    'Arquitetura',
    'Psicologia',
    'Logística',
    'Comércio / Vendas',
    'Turismo / Hotelaria',
    'Gastronomia',
    'Meio Ambiente / Sustentabilidade',
    'Ciências Biológicas',
    'Artes / Cultura',
    'Esportes',
    'Segurança / Defesa',
    'Agronegócio',
    'Finanças / Economia',
    'Produção Industrial',
  ];
  
  const [vaga, setVaga] = useState({
    titulo: "",
    descricao: "",
    areaProfissional: "",
    requisitos: [] as string[],
    faixaSalarial: "",
    modalidade: "",
    tipoContrato: "",
    beneficios: [] as string[],
    vagaUrgente: false,
    dataLimite: "",
  });

  const [requisitoNovo, setRequisitoNovo] = useState("");
  const [beneficioNovo, setBeneficioNovo] = useState("");
  const [vagaCadastrada, setVagaCadastrada] = useState(false);

  const adicionarRequisito = () => {
    if (requisitoNovo.trim()) {
      setVaga((prev) => ({
        ...prev,
        requisitos: [...prev.requisitos, requisitoNovo.trim()],
      }));
      setRequisitoNovo("");
    }
  };

  const adicionarBeneficio = () => {
    if (beneficioNovo.trim()) {
      setVaga((prev) => ({
        ...prev,
        beneficios: [...prev.beneficios, beneficioNovo.trim()],
      }));
      setBeneficioNovo("");
    }
  };

  const enviarVaga = async () => {
    const token = localStorage.getItem("empresaToken");
    if (!token || !empresa.id) {
      toast.error("⚠️ Sessão expirada. Faça login novamente.");
      return;
    }
    if (!vaga.titulo || !vaga.descricao || !vaga.areaProfissional) {
      toast.error("Preencha os campos obrigatórios: título, descrição e área.");
      return;
    }

    const payload = {
      ...vaga,
      empresaId: empresa.id,
      vagaUrgente: plano !== "padrao" && vaga.vagaUrgente,
    };

    try {
      const response = await fetch("https://projeto-startup.onrender.com/vagas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setVagaCadastrada(true);
        
        toast.success("🚀 Vaga criada com sucesso!\nEla já está disponível para candidatos 🎯", {
          style: {
            background: "linear-gradient(135deg, #0f172a 0%, #06b6d4 100%)",
            color: "#e0faff",
            fontWeight: "600",
            border: "1px solid rgba(94,234,212,0.3)",
            borderRadius: "14px",
            boxShadow: "0 0 25px rgba(6,182,212,0.5)",
            padding: "18px 22px",
            whiteSpace: "pre-line",
          },
          icon: "🎉",
          duration: 4000,
        });

        setTimeout(() => navigate("/dashboard"), 2500);
      } else {
        toast.error("❌ Erro ao criar vaga.");
      }
    } catch (err) {
      console.error("Erro ao criar vaga:", err);
      toast.error("Erro inesperado ao enviar vaga.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100 px-6 py-12 relative overflow-hidden">
      {/* fundo decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none"></div>

      {/* Mensagem de Vaga Cadastrada */}
      {vagaCadastrada && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-gradient-to-r from-green-900/90 to-emerald-900/90 backdrop-blur-sm border border-emerald-700/50 rounded-2xl p-6 shadow-2xl shadow-emerald-500/20 max-w-md mx-auto">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-400/30">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-100 mb-1">
                  Vaga Cadastrada com Sucesso!
                </h3>
                <p className="text-emerald-200/80 text-sm">
                  Sua vaga foi publicada e já está visível para candidatos.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold mb-10 text-center text-cyan-400">
          Cadastrar Nova Vaga
        </h1>

        <div className="bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-2xl shadow-lg p-8">
          {/* Título */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-300 mb-2">
              Título da vaga *
            </label>
            <input
              type="text"
              placeholder="Ex: Dentista"
              value={vaga.titulo}
              onChange={(e) => setVaga({ ...vaga, titulo: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none text-gray-100"
            />
          </div>

          {/* Área */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-300 mb-2">
              Área de atuação *
            </label>
            <select
              value={vaga.areaProfissional}
              onChange={(e) => setVaga({ ...vaga, areaProfissional: e.target.value })}
              className="
                w-full bg-neutral-950 border border-neutral-800 
                rounded-lg p-3 text-gray-100 outline-none
                focus:ring-2 focus:ring-cyan-400
                appearance-none cursor-pointer
              "
            >
              <option value="" disabled>
                Selecione uma área
              </option>
              {areas.map((a, index) => (
                <option key={index} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* Requisitos */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-300 mb-2">Requisitos</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Digite um requisito"
                value={requisitoNovo}
                onChange={(e) => setRequisitoNovo(e.target.value)}
                className="w-50 flex-grow bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none text-gray-100"
              />
              <button
                type="button"
                onClick={adicionarRequisito}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
              >
                Adicionar
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {vaga.requisitos.map((r, i) => (
                <span
                  key={i}
                  className="bg-cyan-900/40 text-cyan-300 px-3 py-1 rounded-full text-sm border border-cyan-800"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>

          {/* Benefícios */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-300 mb-2">Benefícios</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Digite um benefício"
                value={beneficioNovo}
                onChange={(e) => setBeneficioNovo(e.target.value)}
                className="w-50 flex-grow bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:ring-2 focus:ring-emerald-400 outline-none text-gray-100"
              />
              <button
                type="button"
                onClick={adicionarBeneficio}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
              >
                Adicionar
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {vaga.beneficios.map((b, i) => (
                <span
                  key={i}
                  className="bg-emerald-900/40 text-emerald-300 px-3 py-1 rounded-full text-sm border border-emerald-800"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Data limite */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-300 mb-2">
              Data limite para candidaturas
            </label>
            <input
              type="date"
              value={vaga.dataLimite}
              onChange={(e) => setVaga({ ...vaga, dataLimite: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none text-gray-100"
            />
          </div>

          {/* Descrição */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-300 mb-2">
              Descrição da vaga *
            </label>
            <textarea
              placeholder="Descreva a vaga, responsabilidades e perfil desejado..."
              value={vaga.descricao}
              onChange={(e) => setVaga({ ...vaga, descricao: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 h-40 resize-none focus:ring-2 focus:ring-cyan-400 outline-none text-gray-100"
            />
          </div>

          {/* Urgente */}
          {plano !== "padrao" ? (
            <label className="flex items-center gap-2 mb-8">
              <input
                type="checkbox"
                checked={vaga.vagaUrgente}
                onChange={(e) =>
                  setVaga({ ...vaga, vagaUrgente: e.target.checked })
                }
                className="h-4 w-4 text-yellow-500 focus:ring-yellow-400"
              />
              <span className="text-gray-300 font-medium">
                Marcar como vaga urgente
              </span>
            </label>
          ) : (
            <div className="mb-8 text-sm text-red-400">
              ⚠️ Vagas urgentes estão disponíveis apenas para planos pagos.{" "}
              <Link
                to="/premium"
                className="text-cyan-400 underline font-medium hover:text-cyan-300"
              >
                Atualize seu plano
              </Link>
            </div>
          )}

          {/* Botões */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              onClick={enviarVaga}
              className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition"
            >
              Concluir
            </button>

            <Link
              to="/dashboard"
              className="px-6 py-3 border border-neutral-800 text-gray-400 rounded-lg font-semibold hover:bg-neutral-800 hover:text-gray-200 transition"
            >
              Voltar
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
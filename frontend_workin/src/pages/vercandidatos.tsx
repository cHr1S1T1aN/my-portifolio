import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

// Tipos TypeScript
interface Candidato {
  id: string;
  nome: string;
  email: string;
  areaAtuacao: string;
  experiencia?: string;
  interesse?: string;
  createdAt?: {
    _seconds: number;
  };
  ensinoSuperior?: {
    instituicao?: string;
  };
  curriculo_url?: string;
}

interface Filtros {
  area: string;
  nome: string;
  interesse: string;
  experiencia: string;
}

export default function Candidatos() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [candidatosFiltrados, setCandidatosFiltrados] = useState<Candidato[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtros, setFiltros] = useState<Filtros>({
    area: "",
    nome: "",
    interesse: "",
    experiencia: ""
  });

  // ✅ ÁREAS ATUALIZADAS CONFORME SOLICITADO
  const areas = [
    "Todas as áreas",
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

  const niveisExperiencia = [
    "Todos os níveis",
    "Estagiário",
    "Júnior",
    "Pleno",
    "Sênior"
  ];

  // Buscar candidatos
  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        setError(null);
        setLoading(true);
        
        const params = new URLSearchParams();
        if (filtros.area && filtros.area !== "Todas as áreas") params.append("area", filtros.area);
        if (filtros.nome) params.append("nome", filtros.nome);
        if (filtros.interesse) params.append("interesse", filtros.interesse);

        const res = await fetch(`https://projeto-startup.onrender.com/alunos?${params.toString()}`);
        
        if (!res.ok) {
          throw new Error(`Erro ${res.status}: ${res.statusText}`);
        }
        
        const data = await res.json();

        if (data.success) {
          setCandidatos(data.alunos || []);
          setCandidatosFiltrados(data.alunos || []);
        } else {
          throw new Error("Falha ao carregar candidatos");
        }
      } catch (error) {
        console.error("❌ Erro ao carregar alunos:", error);
        setError("Erro ao carregar candidatos. Tente novamente.");
        setCandidatos([]);
        setCandidatosFiltrados([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce para evitar muitas requisições
    const timeoutId = setTimeout(fetchAlunos, 300);
    return () => clearTimeout(timeoutId);
  }, [filtros.area, filtros.nome, filtros.interesse]);

  // Filtro local por experiência
  useEffect(() => {
    if (filtros.experiencia && filtros.experiencia !== "Todos os níveis") {
      const filtrados = candidatos.filter(candidato => 
        candidato.experiencia?.toLowerCase().includes(filtros.experiencia.toLowerCase())
      );
      setCandidatosFiltrados(filtrados);
    } else {
      setCandidatosFiltrados(candidatos);
    }
  }, [candidatos, filtros.experiencia]);

  const handleFiltroChange = useCallback((campo: keyof Filtros, valor: string) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
  }, []);

  const limparFiltros = () => {
    setFiltros({
      area: "",
      nome: "",
      interesse: "",
      experiencia: ""
    });
  };

  const temFiltrosAtivos = Object.values(filtros).some(valor => valor !== "");

  // ✅ Atualizar o número de áreas disponíveis (subtraindo "Todas as áreas")
  const numeroAreasDisponiveis = areas.length - 1;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100 px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Carregando candidatos...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100 px-6 py-12">
      <main className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-cyan-400 mb-4">
            Encontre Talentos
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Descubra candidatos qualificados para sua empresa. Filtre por área, experiência e interesses específicos.
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">{candidatos.length}</div>
            <div className="text-gray-400 text-sm">Total de candidatos</div>
          </div>
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{candidatosFiltrados.length}</div>
            <div className="text-gray-400 text-sm">Candidatos filtrados</div>
          </div>
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {numeroAreasDisponiveis}
            </div>
            <div className="text-gray-400 text-sm">Áreas disponíveis</div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-cyan-300">Filtros</h2>
            {temFiltrosAtivos && (
              <button
                onClick={limparFiltros}
                className="px-3 py-1 text-sm bg-neutral-800 hover:bg-neutral-700 rounded-lg transition"
              >
                Limpar filtros
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Área de Atuação
              </label>
              <select
                value={filtros.area}
                onChange={(e) => handleFiltroChange("area", e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition"
              >
                {areas.map(area => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome
              </label>
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={filtros.nome}
                onChange={(e) => handleFiltroChange("nome", e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Interesse
              </label>
              <input
                type="text"
                placeholder="Buscar por interesse..."
                value={filtros.interesse}
                onChange={(e) => handleFiltroChange("interesse", e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Experiência
              </label>
              <select
                value={filtros.experiencia}
                onChange={(e) => handleFiltroChange("experiencia", e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition"
              >
                {niveisExperiencia.map(nivel => (
                  <option key={nivel} value={nivel}>
                    {nivel}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div className="bg-red-900/20 border border-red-800 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <span className="text-red-400 mr-2">❌</span>
              <span className="text-red-300">{error}</span>
            </div>
          </div>
        )}

        {/* Lista de Candidatos */}
        {candidatosFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Nenhum candidato encontrado
            </h3>
            <p className="text-gray-500 mb-4">
              {temFiltrosAtivos 
                ? "Tente ajustar os filtros para ver mais resultados."
                : "Não há candidatos cadastrados no momento."
              }
            </p>
            {temFiltrosAtivos && (
              <button
                onClick={limparFiltros}
                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-medium transition"
              >
                Limpar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {candidatosFiltrados.map((candidato) => (
              <div
                key={candidato.id}
                className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-cyan-300 group-hover:text-cyan-200 transition">
                      {candidato.nome}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                      {candidato.ensinoSuperior?.instituicao || "Formação não informada"}
                    </p>
                  </div>
                  {candidato.curriculo_url && (
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded-full border border-green-800">
                      CV Disponível
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-300">
                    <span className="w-20 text-gray-500 text-sm">Área:</span>
                    <span className="bg-neutral-800 px-2 py-1 rounded text-sm">
                      {candidato.areaAtuacao}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="w-20 text-gray-500 text-sm">Email:</span>
                    <span className="text-sm">{candidato.email}</span>
                  </div>
                  {candidato.interesse && (
                    <div className="flex items-center text-gray-300">
                      <span className="w-20 text-gray-500 text-sm">Interesse:</span>
                      <span className="text-sm">{candidato.interesse}</span>
                    </div>
                  )}
                  {candidato.experiencia && (
                    <div className="flex items-center text-gray-300">
                      <span className="w-20 text-gray-500 text-sm">Experiência:</span>
                      <span className="text-sm">{candidato.experiencia}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Link
                    to={`/candidato/${candidato.id}`}
                    className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium text-center transition flex items-center justify-center gap-2"
                  >
                    <span>👤</span>
                    Ver Perfil
                  </Link>
                  
                  {candidato.curriculo_url && (
                    <a
                      href={candidato.curriculo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-center transition flex items-center justify-center gap-2"
                    >
                      <span>📄</span>
                      CV
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
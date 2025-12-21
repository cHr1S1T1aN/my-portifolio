import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Tipos para melhor organização
interface Candidato {
  id: string;
  nome: string;
  email: string;
  areaAtuacao?: string;
  experiencia?: string;
  interesse?: string;
  createdAt?: {
    _seconds: number;
  };
  ensinoSuperior?: {
    instituicao?: string;
    curso?: string;
    cargaHoraria?: string;
  };
  cursos?: Array<{
    nome: string;
    instituicao: string;
    cargaHoraria: string;
    cursando?: boolean;
    dataConclusao?: string;
  }>;
  curriculo_url?: string;
}

interface Vaga {
  id: string;
  titulo: string;
  areaProfissional: string;
  descricao: string;
  requisitos: string[];
  beneficios: string[];
  modalidade: string;
  tipoContrato: string;
  faixaSalarial: string;
  vagaUrgente: boolean;
  dataLimite: string;
  empresaId: string;
  createdAt: string;
}

export default function CandidatoPerfil() {
  const { id } = useParams();
  const [candidato, setCandidato] = useState<Candidato | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [vagaSelecionada, setVagaSelecionada] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [loadingVagas, setLoadingVagas] = useState(false);

  // 📌 Buscar candidato com tratamento melhorado
  useEffect(() => {
    const fetchCandidato = async () => {
      if (!id) {
        setError("ID do candidato não encontrado");
        setLoading(false);
        return;
      }

      try {
        setError(null);
        const res = await fetch(`https://projeto-startup.onrender.com/alunos/${id}`);
        
        if (!res.ok) {
          throw new Error(`Erro HTTP: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.success && data.aluno) {
          setCandidato(data.aluno);
        } else {
          throw new Error("Candidato não encontrado");
        }
      } catch (error) {
        console.error("❌ Erro ao carregar candidato:", error);
        setError("Erro ao carregar dados do candidato");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCandidato();
  }, [id]);

  // 📌 Buscar vagas da empresa - CORRIGIDO
  useEffect(() => {
    const fetchVagasEmpresa = async () => {
      try {
        setLoadingVagas(true);
        
        // Buscar empresa do localStorage
        const empresaStorage = localStorage.getItem("empresa");
        if (!empresaStorage) {
          console.warn("⚠️ Empresa não encontrada no localStorage");
          setVagas([]);
          return;
        }

        const empresa = JSON.parse(empresaStorage);
        const token = localStorage.getItem("empresaToken");

        if (!empresa.id || !token) {
          console.warn("⚠️ Dados da empresa incompletos no localStorage");
          setVagas([]);
          return;
        }

        console.log("🔄 Buscando vagas para empresa:", empresa.id);

        // CORREÇÃO: Buscar vagas específicas da empresa
        const response = await fetch(`https://projeto-startup.onrender.com/vagas/empresa/${empresa.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        console.log("📋 Resposta da API de vagas:", data);
        
        if (data.success && Array.isArray(data.vagas)) {
          setVagas(data.vagas);
          console.log(`✅ ${data.vagas.length} vagas carregadas`);
        } else {
          console.warn("Nenhuma vaga encontrada ou formato de resposta inválido", data);
          setVagas([]);
        }
      } catch (error) {
        console.error("❌ Erro ao carregar vagas:", error);
        setVagas([]);
      } finally {
        setLoadingVagas(false);
      }
    };

    fetchVagasEmpresa();
  }, []);

  // 📌 Enviar vaga selecionada ao candidato
  const enviarVaga = async () => {
    if (!vagaSelecionada) {
      alert("⚠️ Escolha uma vaga antes de enviar.");
      return;
    }

    const empresaStorage = localStorage.getItem("empresa");
    if (!empresaStorage) {
      alert("⚠️ Empresa não identificada. Faça login novamente.");
      return;
    }

    const empresa = JSON.parse(empresaStorage);
    const token = localStorage.getItem("empresaToken");

    if (!empresa.id || !token) {
      alert("⚠️ Dados da empresa incompletos. Faça login novamente.");
      return;
    }

    if (!id) {
      alert("⚠️ Candidato não identificado.");
      return;
    }

    try {
      setEnviando(true);

      console.log("📤 Enviando vaga:", {
        vagaId: vagaSelecionada,
        empresaId: empresa.id,
        candidatoId: id
      });

      const enviarRes = await fetch(
        `https://projeto-startup.onrender.com/alunos/${id}/vagaEnviada`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            vagaId: vagaSelecionada,
            empresaId: empresa.id,
          }),
        }
      );

      const enviarData = await enviarRes.json();
      console.log("📨 Resposta do envio:", enviarData);

      if (enviarData.success) {
        alert("🎉 Vaga enviada com sucesso!");
        setVagaSelecionada(""); // Resetar seleção
      } else {
        alert("❌ Erro ao enviar vaga: " + (enviarData.message || "Erro desconhecido"));
      }
    } catch (err) {
      console.error("Erro ao enviar vaga:", err);
      alert("❌ Erro de conexão ao enviar a vaga.");
    } finally {
      setEnviando(false);
    }
  };

  // 📌 Estados de loading e error
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100 px-6 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Carregando perfil do candidato...</p>
        </div>
      </div>
    );
  }

  if (error || !candidato) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100 px-6 py-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">❌ {error || "Candidato não encontrado"}</p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-cyan-600 rounded-lg hover:bg-cyan-700 transition"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100 px-6 py-12">
      <main className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-10">
          Perfil do Candidato
        </h1>

        {/* Dados do candidato */}
        <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl shadow-lg p-8 space-y-4 mb-8">
          <p><span className="font-semibold text-gray-300">Nome:</span> {candidato.nome || "Não informado"}</p>
          <p><span className="font-semibold text-gray-300">Email:</span> {candidato.email}</p>
          <p><span className="font-semibold text-gray-300">Área de Atuação:</span> {candidato.areaAtuacao || "Não informado"}</p>
          <p><span className="font-semibold text-gray-300">Experiência:</span> {candidato.experiencia || "Não informado"}</p>
          <p><span className="font-semibold text-gray-300">Interesse:</span> {candidato.interesse || "Não informado"}</p>
          <p><span className="font-semibold text-gray-300">Criado em:</span> {candidato.createdAt ? new Date(candidato.createdAt._seconds * 1000).toLocaleString("pt-BR") : "Não informado"}</p>

          <hr className="border-neutral-800 my-4" />

          <h2 className="text-xl font-semibold text-cyan-300">Ensino Superior</h2>
          <p><span className="font-semibold text-gray-300">Instituição:</span> {candidato.ensinoSuperior?.instituicao || "Não informado"}</p>
          <p><span className="font-semibold text-gray-300">Carga Horária:</span> {candidato.ensinoSuperior?.cargaHoraria || "Não informado"} horas</p>
          <p><span className="font-semibold text-gray-300">Nome Do Curso:</span> {candidato.ensinoSuperior?.curso || "Não informado"}</p>

          <hr className="border-neutral-800 my-4" />

          <h2 className="text-xl font-semibold text-cyan-300">Cursos Complementares</h2>
          <ul className="list-disc ml-6 text-gray-400">
            {candidato.cursos && candidato.cursos.length > 0 ? (
              candidato.cursos.map((curso, index) => (
                <li key={index}>
                  {curso.nome} - {curso.instituicao} ({curso.cargaHoraria}h){" "}
                  {curso.cursando ? "(Cursando)" : curso.dataConclusao ? `(Concluído em ${curso.dataConclusao})` : ""}
                </li>
              ))
            ) : (
              <li>Nenhum curso informado</li>
            )}
          </ul>

          {candidato.curriculo_url && (
            <>
              <hr className="border-neutral-800 my-4" />
              <a
                href={candidato.curriculo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition"
              >
                📄 Ver currículo externo
              </a>
            </>
          )}
        </div>

        {/* Seção de envio de vaga */}
        <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-6">Enviar Oportunidade</h2>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 font-medium">
              Selecione uma vaga:
            </label>
            <select
              className="bg-neutral-800 text-gray-200 p-3 rounded-lg w-full border border-neutral-700 focus:border-cyan-500 focus:outline-none transition"
              value={vagaSelecionada}
              onChange={(e) => setVagaSelecionada(e.target.value)}
              disabled={loadingVagas || vagas.length === 0}
            >
              <option value="">Escolher vaga...</option>
              {loadingVagas ? (
                <option disabled>Carregando vagas...</option>
              ) : vagas.length > 0 ? (
                vagas.map((vaga) => (
                  <option key={vaga.id} value={vaga.id}>
                    {vaga.titulo} • {vaga.areaProfissional}
                  </option>
                ))
              ) : (
                <option disabled>Nenhuma vaga cadastrada</option>
              )}
            </select>
            {loadingVagas && (
              <p className="text-cyan-400 text-sm mt-2">Carregando suas vagas...</p>
            )}
            {!loadingVagas && vagas.length === 0 && (
              <p className="text-yellow-400 text-sm mt-2">
                ⚠️ Nenhuma vaga encontrada. Verifique se você criou vagas.
              </p>
            )}
            {!loadingVagas && vagas.length > 0 && (
              <p className="text-green-400 text-sm mt-2">
                ✅ {vagas.length} vaga(s) encontrada(s)
              </p>
            )}
          </div>

          <button
            onClick={enviarVaga}
            disabled={enviando || !vagaSelecionada || loadingVagas}
            className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-900 disabled:cursor-not-allowed rounded-lg font-semibold text-white transition flex items-center justify-center"
          >
            {enviando ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Enviando...
              </>
            ) : (
              "📨 Enviar vaga ao candidato"
            )}
          </button>

          {vagas.length === 0 && !loadingVagas && (
            <p className="text-yellow-400 text-sm mt-4 text-center">
              ⚠️ Você não tem vagas cadastradas. Crie vagas primeiro para poder enviar aos candidatos.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
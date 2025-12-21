import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ResultadosDoTeste() {
  const { id } = useParams();
  const [respostas, setRespostas] = useState<any[]>([]);
  const [alunosInfo, setAlunosInfo] = useState<{[key: string]: {nome: string, email: string}}>({});
  const [loading, setLoading] = useState(true);

  // Função para buscar informações do aluno
  const buscarAluno = async (alunoId: string) => {
    try {
      const token = localStorage.getItem("empresaToken");
      const response = await fetch(`https://projeto-startup.onrender.com/alunos/${alunoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return {
          nome: data.aluno?.nome || 'Nome não encontrado',
          email: data.aluno?.email || 'Email não encontrado'
        };
      }
      return {
        nome: 'Nome não encontrado',
        email: 'Email não encontrado'
      };
    } catch (error) {
      console.error('Erro ao buscar aluno:', error);
      return {
        nome: 'Erro ao carregar',
        email: 'Erro ao carregar'
      };
    }
  };

  // Função para formatar a data
  const formatarData = (dataEnvio: any) => {
    // Se for um objeto do Firestore timestamp
    if (dataEnvio && typeof dataEnvio === 'object') {
      if (dataEnvio._seconds) {
        // Se for um timestamp do Firestore convertido
        return new Date(dataEnvio._seconds * 1000).toLocaleString('pt-BR');
      }
      return 'Data em processamento';
    }
    
    // Se já for uma string
    if (typeof dataEnvio === 'string') {
      return dataEnvio;
    }
    
    return 'Data não disponível';
  };

  // Buscar todas as respostas
  useEffect(() => {
    const token = localStorage.getItem("empresaToken");

    fetch(`https://projeto-startup.onrender.com/testes/${id}/respostas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const t = await res.text();
          throw new Error(t);
        }
        return res.json();
      })
      .then(async (data) => {
        const respostasData = data.respostas || [];
        setRespostas(respostasData);

        // Buscar informações de cada aluno
        const alunosInfoMap: {[key: string]: {nome: string, email: string}} = {};
        
        for (const resposta of respostasData) {
          if (resposta.alunoId) {
            const alunoInfo = await buscarAluno(resposta.alunoId);
            alunosInfoMap[resposta.alunoId] = alunoInfo;
          }
        }

        setAlunosInfo(alunosInfoMap);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar respostas:", err);
        setLoading(false);
      });
  }, [id]);

  // Função para renderizar perguntas dissertativas
  const renderizarDissertativas = (testeInfo: any, respostasAluno: any) => {
    if (!testeInfo?.dissertativas || !Array.isArray(testeInfo.dissertativas)) {
      return null;
    }

    return (
      <div className="mb-6">
        <h4 className="text-cyan-400 text-lg font-semibold mb-3 flex items-center gap-2">
          📝 Perguntas Dissertativas
        </h4>
        <div className="space-y-4">
          {testeInfo.dissertativas.map((pergunta: string, index: number) => (
            <div key={index} className="p-4 bg-neutral-950/50 rounded-xl border border-neutral-800">
              <p className="text-cyan-300 font-medium mb-2">
                {index + 1}. {pergunta}
              </p>
              <p className="text-gray-300 whitespace-pre-wrap">
                {respostasAluno?.dissertativas?.[index] || (
                  <span className="text-gray-500 italic">Sem resposta</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Função para renderizar múltipla escolha
  const renderizarMultiplaEscolha = (testeInfo: any, respostasAluno: any) => {
    if (!testeInfo?.multiplaEscolha || !Array.isArray(testeInfo.multiplaEscolha)) {
      return null;
    }

    return (
      <div className="mb-6">
        <h4 className="text-cyan-400 text-lg font-semibold mb-3 flex items-center gap-2">
          🔘 Perguntas de Múltipla Escolha
        </h4>
        <div className="space-y-4">
          {testeInfo.multiplaEscolha.map((perguntaObj: any, index: number) => (
            <div key={index} className="p-4 bg-neutral-950/50 rounded-xl border border-neutral-800">
              <p className="text-cyan-300 font-medium mb-3">
                {index + 1}. {perguntaObj.pergunta}
              </p>
              
              {/* Opções da pergunta */}
              <div className="space-y-2 mb-3">
                {perguntaObj.opcoes?.map((opcao: string, opcaoIndex: number) => (
                  <div key={opcaoIndex} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      opcao === perguntaObj.correta 
                        ? 'border-green-500 bg-green-500' 
                        : 'border-gray-500'
                    }`} />
                    <span className={`${
                      opcao === respostasAluno?.multiplaEscolha?.[index]
                        ? opcao === perguntaObj.correta
                          ? 'text-green-400 font-semibold'
                          : 'text-red-400 font-semibold'
                        : 'text-gray-300'
                    }`}>
                      {opcao}
                      {opcao === perguntaObj.correta && ' ✓'}
                      {opcao === respostasAluno?.multiplaEscolha?.[index] && opcao !== perguntaObj.correta && ' ✗'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Resposta do aluno */}
              <div className="mt-3 p-3 bg-neutral-900 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Resposta do Candidato:</p>
                <p className="text-white font-medium">
                  {respostasAluno?.multiplaEscolha?.[index] || (
                    <span className="text-gray-500 italic">Não respondida</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Função para renderizar projeto
  const renderizarProjeto = (testeInfo: any, respostasAluno: any) => {
    if (!testeInfo?.projeto) {
      return null;
    }

    return (
      <div className="mb-6">
        <h4 className="text-cyan-400 text-lg font-semibold mb-3 flex items-center gap-2">
          🚀 Projeto
        </h4>
        
        {/* Descrição do projeto */}
        <div className="p-4 bg-neutral-950/50 rounded-xl border border-neutral-800 mb-4">
          <p className="text-cyan-300 font-medium mb-2">Descrição do Projeto:</p>
          <p className="text-gray-300">{testeInfo.projeto.descricao}</p>
        </div>

        {/* Resposta do aluno */}
        <div className="p-4 bg-neutral-950/50 rounded-xl border border-neutral-800 min-h-20 mb-4">
          <p className="text-cyan-300 font-medium mb-2">Resposta do Candidato:</p>
          {respostasAluno?.projeto?.resposta ? (
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {respostasAluno.projeto.resposta}
            </p>
          ) : (
            <span className="text-gray-500 italic">
              Sem descrição do projeto
            </span>
          )}
        </div>

        {respostasAluno?.projeto?.imagemNome && (
          <div className="flex items-center gap-3 p-3 bg-cyan-950/20 rounded-lg border border-cyan-800/50">
            <span className="text-cyan-400">📎</span>
            <span className="text-cyan-300 font-medium text-sm">
              Arquivo enviado: {respostasAluno.projeto.imagemNome}
            </span>
          </div>
        )}
      </div>
    );
  };

  if (loading) return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100">
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
      <p className="text-center text-gray-400">Carregando respostas...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100 px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none"></div>

      <div className="w-full max-w-4xl mx-auto px-3 sm:px-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-4">
            📊 Resultados do Teste
          </h1>
          <p className="text-gray-400 text-lg">
            {respostas.length} resposta(s) encontrada(s)
          </p>
        </div>

        {respostas.length === 0 ? (
          <div className="bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">
              Nenhuma resposta encontrada
            </h3>
            <p className="text-gray-400">
              Quando os alunos enviarem respostas, elas aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {respostas.map((r, i) => {
              const alunoInfo = alunosInfo[r.alunoId] || { nome: 'Carregando...', email: 'Carregando...' };
              
              return (
                <div
                  key={i}
                  className="bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-2xl shadow-lg p-6 hover:border-cyan-900/50 transition-all duration-300"
                >
                  {/* Cabeçalho do Aluno */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-neutral-800">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {alunoInfo.nome.charAt(0)?.toUpperCase() || 'A'}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {alunoInfo.nome}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          📧 {alunoInfo.email}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          ID: {r.alunoId}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      r.status === 'concluído' ? 'bg-green-900/40 text-green-300 border border-green-800' : 
                      r.status === 'pendente_correcao' ? 'bg-yellow-900/40 text-yellow-300 border border-yellow-800' : 
                      'bg-red-900/40 text-red-300 border border-red-800'
                    }`}>
                      {r.status || 'Não definido'}
                    </div>
                  </div>

                  {/* Informações do Teste */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-neutral-950/50 rounded-xl border border-neutral-800">
                    <div>
                      <h4 className="text-cyan-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                        📝 Título do Teste
                      </h4>
                      <p className="text-white font-medium">
                        {r.testeInfo?.titulo || 'Não informado'}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-cyan-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                        💼 Vaga
                      </h4>
                      <p className="text-white font-medium">
                        {r.vagaTitulo || 'Não informada'}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-cyan-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                        ⏰ Tipo
                      </h4>
                      <p className="text-white font-medium">
                        {r.testeInfo?.tipo || 'Não definido'}
                      </p>
                    </div>
                  </div>

                  {/* Renderizar todos os tipos de perguntas */}
                  {renderizarDissertativas(r.testeInfo, r.respostas)}
                  {renderizarMultiplaEscolha(r.testeInfo, r.respostas)}
                  {renderizarProjeto(r.testeInfo, r.respostas)}

                  {/* Data de Envio - CORRIGIDO */}
                  <div className="mt-6 pt-4 border-t border-neutral-800">
                    <p className="text-gray-400 text-sm">
                      <strong>Data de Envio:</strong>{' '}
                      {formatarData(r.dataEnvio)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
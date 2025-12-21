import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AjudaProjetos() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100 px-6 py-12 relative overflow-hidden">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(250,204,21,0.08),transparent_70%)] pointer-events-none"></div>

      <main className="max-w-4xl mx-auto relative z-10 space-y-10">
        {/* Cabeçalho */}
        <div className="relative mb-10">
          <h1 className="text-4xl font-bold text-yellow-400 text-center">
            Como funcionam os Projetos Práticos
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition"
            title="Voltar"
          >
            <ArrowLeft size={28} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-2xl shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-yellow-400 mb-2">
              🎯 O que são os Projetos Práticos
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Os projetos práticos são desafios criados pela empresa para testar as
              habilidades reais dos candidatos em situações próximas do dia a dia de trabalho.
              Eles podem ser utilizados como etapa complementar do processo seletivo
              de uma vaga.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-yellow-400 mb-2">
              🧩 Como criar um projeto
            </h2>
            <ol className="list-decimal list-inside text-gray-300 space-y-2">
              <li>Selecione uma vaga ativa à qual o projeto estará vinculado.</li>
              <li>Defina um título claro, por exemplo: <em>“Desenvolver uma API de autenticação”</em>.</li>
              <li>Descreva o desafio, os requisitos técnicos e critérios de avaliação.</li>
              <li>Informe o prazo de entrega (data limite para envio pelos candidatos).</li>
              <li>Clique em <strong>“Salvar projeto”</strong> para disponibilizá-lo aos candidatos da vaga.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-yellow-400 mb-2">
              👥 Como os candidatos recebem o desafio
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Quando um projeto é criado, ele aparece automaticamente no aplicativo mobile
              dos candidatos que se candidataram à vaga vinculada.  
              Eles poderão ler as instruções, desenvolver a solução e enviar o resultado
              diretamente pelo app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-yellow-400 mb-2">
              🧠 Dicas para um bom projeto
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Mantenha o desafio relevante e proporcional ao nível da vaga.</li>
              <li>Especifique claramente o que será avaliado (ex: código limpo, criatividade, prazo).</li>
              <li>Inclua exemplos ou materiais de referência, se necessário.</li>
              <li>Defina um prazo realista para que os candidatos possam se organizar.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-yellow-400 mb-2">
              📊 Avaliando os resultados
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Após o prazo de entrega, os projetos enviados ficam disponíveis na área de
              <strong> Avaliação </strong> do painel da empresa.  
              Ali você poderá revisar, pontuar e comparar os candidatos de forma organizada.
            </p>
          </section>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-yellow-400 hover:text-yellow-300 underline font-medium transition"
          >
            Voltar
          </button>
        </div>
      </main>
    </div>
  );
}

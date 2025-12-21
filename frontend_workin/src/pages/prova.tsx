import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Prova() {
  const [vagasAtivas, setVagasAtivas] = useState<any[]>([]);
  const [vagaSelecionada, setVagaSelecionada] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  useEffect(() => {
    const empresa = JSON.parse(localStorage.getItem("empresa") || "{}");
    const token = localStorage.getItem("empresaToken");
    
    console.log("Empresa ID:", empresa.id); // ✅ Aqui sim
   fetch(`https://projeto-startup.onrender.com/vagas/empresa/${empresa.id}/ativas`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setVagasAtivas(data.vagas))
      .catch((err) => console.error("Erro ao carregar vagas ativas:", err));
  }, []);

  const [dissertativas, setDissertativas] = useState<string[]>([]);
  const [editandoDissertativa, setEditandoDissertativa] = useState<number | null>(null);
  const [textoEditado, setTextoEditado] = useState("");
  const [respostaCorreta, setRespostaCorreta] = useState("");

  const [multiplaEscolha, setMultiplaEscolha] = useState<
  { pergunta: string; opcoes: string[]; correta: string }[]
>([]);
  const [editandoMultipla, setEditandoMultipla] = useState<number | null>(null);
  const [novaMultipla, setNovaMultipla] = useState("");
  const [opcoes, setOpcoes] = useState(["", "", "", "", ""]);
  const [prazo, setPrazo] = useState("");

  const adicionarDissertativa = () => {
    if (textoEditado.trim()) {
      setDissertativas([...dissertativas, textoEditado.trim()]);
      setTextoEditado("");
    }
  };

  const iniciarEdicaoDissertativa = (index: number) => {
    setEditandoDissertativa(index);
    setTextoEditado(dissertativas[index]);
  };

  const salvarEdicaoDissertativa = () => {
    if (editandoDissertativa !== null && textoEditado.trim()) {
      const atualizadas = [...dissertativas];
      atualizadas[editandoDissertativa] = textoEditado.trim();
      setDissertativas(atualizadas);
      setEditandoDissertativa(null);
      setTextoEditado("");
    }
  };

  const excluirDissertativa = (index: number) => {
    setDissertativas(dissertativas.filter((_, i) => i !== index));
  };

  const adicionarMultiplaEscolha = () => {
  if (
    novaMultipla.trim() &&
    opcoes.every((o) => o.trim()) &&
    respostaCorreta.trim()
  ) {
    setMultiplaEscolha([
      ...multiplaEscolha,
      {
        pergunta: novaMultipla.trim(),
        opcoes: [...opcoes],
        correta: respostaCorreta,
      },
    ]);

    setNovaMultipla("");
    setOpcoes(["", "", "", "", ""]);
    setRespostaCorreta("");
  } else {
    alert("Preencha todas as alternativas e selecione a resposta correta.");
  }
};
const iniciarEdicaoMultipla = (index: number) => {
  setEditandoMultipla(index);
  setNovaMultipla(multiplaEscolha[index].pergunta);
  setOpcoes([...multiplaEscolha[index].opcoes]);
  setRespostaCorreta(multiplaEscolha[index].correta || "");
};

 const salvarEdicaoMultipla = () => {
  if (
    editandoMultipla !== null &&
    novaMultipla.trim() &&
    opcoes.every((o) => o.trim()) &&
    respostaCorreta.trim()
  ) {
    const atualizadas = [...multiplaEscolha];
    atualizadas[editandoMultipla] = {
      pergunta: novaMultipla.trim(),
      opcoes: [...opcoes],
      correta: respostaCorreta, // <- importante
    };
    setMultiplaEscolha(atualizadas);
    setEditandoMultipla(null);
    setNovaMultipla("");
    setOpcoes(["", "", "", "", ""]);
    setRespostaCorreta("");
  } else {
    alert("Preencha todas as alternativas e selecione a resposta correta.");
  }
};

  const excluirMultiplaEscolha = (index: number) => {
    setMultiplaEscolha(multiplaEscolha.filter((_, i) => i !== index));
  };
  const navigate = useNavigate();



  const salvarRascunhoTeste = async () => {
    setMensagemSucesso("Teste salvo com sucesso! 🎉");

    // esconder depois de 3 segundos
    setTimeout(() => {
      setMensagemSucesso("");
    }, 3000);
  if (!vagaSelecionada) {
    alert("Selecione uma vaga para vincular o teste.");
    return;
  }

  const token = localStorage.getItem("empresaToken");
  if (!token) {
    alert("Sessão expirada. Faça login novamente.");
    return;
  }

  const teste = {
    vagaId: vagaSelecionada,
    tipo: "prova", // opcional, mas ajuda o backend a identificar
    dissertativas,
    multiplaEscolha,
    prazo,
  };

  try {
    const response = await fetch("https://projeto-startup.onrender.com/testes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(teste),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro detalhado:", errorText);
      throw new Error("Erro ao salvar teste");
    }

    // salvar localmente (se necessário)
    localStorage.setItem("vagaSelecionada", vagaSelecionada);

    // Redireciona após salvar
    navigate(`/vaga/${vagaSelecionada}/testes`);
  } catch (err) {
    console.error("Erro ao salvar teste:", err);
    alert("Não foi possível salvar o teste.");
  }
};


  return (
  <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100 px-6 py-12 relative overflow-hidden">
    {/* fundo decorativo */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none"></div>
    {mensagemSucesso && (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
        {mensagemSucesso}
      </div>
    )}
    <main className="max-w-4xl mx-auto relative z-10">
      <h1 className="text-4xl font-bold text-center text-cyan-400 mb-4">
        Questionário da Vaga
      </h1>
      <p className="text-center text-gray-400 mb-10">
        Monte perguntas para avaliar melhor os candidatos
      </p>

      {/* Vaga selecionada */}
      <section className="mb-12 bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Vincular Teste</h2>
        <label className="block font-medium text-gray-300 mb-2">Selecione a vaga</label>
        <select
          value={vagaSelecionada}
          onChange={(e) => setVagaSelecionada(e.target.value)}
          className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 w-full text-gray-100 focus:ring-2 focus:ring-cyan-400 outline-none"
        >
          <option value="">Escolha uma vaga</option>
          {vagasAtivas.map((vaga) => (
            <option key={vaga.id} value={vaga.id}>
              {vaga.titulo} — {vaga.areaProfissional}
            </option>
          ))}
        </select>
      </section>

      {/* Perguntas abertas */}
      <section className="mb-12 bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Perguntas Dissertativas</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Digite Uma Pergunta"
            value={editandoDissertativa === null ? textoEditado : ""}
            onChange={(e) => setTextoEditado(e.target.value)}
            className="w-10 flex-grow bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-gray-100 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          {editandoDissertativa === null ? (
            <button
              onClick={adicionarDissertativa}
              className=" bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition"
            >
              Adicionar
            </button>
          ) : (
            <button
              onClick={salvarEdicaoDissertativa}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
            >
              Salvar
            </button>
          )}
        </div>
        <ul className="space-y-2">
          {dissertativas.map((q, i) => (
            <li
              key={i}
              className="bg-neutral-800 p-3 rounded-lg border border-neutral-700 flex justify-between items-center"
            >
              <span>{q}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => iniciarEdicaoDissertativa(i)}
                  className="text-sm text-cyan-400 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluirDissertativa(i)}
                  className="text-sm text-red-400 hover:underline"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Perguntas objetivas */}
      <section className="mb-12 bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Perguntas objetivas</h2>
        <div className="mb-4 ">
          <input
            type="text"
            placeholder="Digite a pergunta objetiva"
            value={novaMultipla}
            onChange={(e) => setNovaMultipla(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 mb-3 text-gray-100 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          {opcoes.map((opcao, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Alternativa ${index + 1}`}
              value={opcao}
              onChange={(e) => {
                const novas = [...opcoes];
                novas[index] = e.target.value;
                setOpcoes(novas);
              }}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 mb-2 text-gray-100 focus:ring-2 focus:ring-cyan-400 outline-none"
            />
          ))}
          <select
          value={respostaCorreta}
          onChange={(e) => setRespostaCorreta(e.target.value)}
          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 mt-2 text-gray-100"
        >
          <option value="">Selecione a alternativa correta</option>
          {opcoes.map((op, index) => (
            <option key={index} value={op}>
              Alternativa {index + 1}: {op || "(vazia)"}
            </option>
          ))}
        </select>
          {editandoMultipla === null ? (
             <div className="mt-2 w-full flex justify-center">
            <button
              onClick={adicionarMultiplaEscolha}
              className=" bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition mt-2"
            >
              Adicionar
            </button>
            </div>
          ) : (
            <button
              onClick={salvarEdicaoMultipla}
              className=" bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition mt-2"
            >
              Salvar
            </button>
          )}
          
        </div>
        <ul className="space-y-4">
          {multiplaEscolha.map((item, i) => (
            <li
              key={i}
              className="bg-neutral-800 p-4 rounded-lg border border-neutral-700"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-200">{item.pergunta}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => iniciarEdicaoMultipla(i)}
                    className="text-sm text-cyan-400 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirMultiplaEscolha(i)}
                    className="text-sm text-red-400 hover:underline"
                  >
                    Excluir
                  </button>
                </div>
              </div>
              <ul className="list-disc pl-5 text-gray-400">
                {item.opcoes.map((op, j) => (
                  <li key={j}>{op}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* Prazo */}
      <section
  className="mb-12 bg-neutral-900/70 backdrop-blur-sm border border-neutral-800
  rounded-2xl shadow-lg p-6 mx-auto text-center"
  style={{ maxWidth: "300px" }} // mantém o mesmo tamanho visual, só centraliza
>
        <h2 className=" text-2xl font-semibold text-cyan-300 mb-4">Configurações</h2>
        <label className="ml-0.5 block font-medium text-gray-300 mb-2">Prazo para entrega</label>
        <input
          type="date"
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)}
          className="w-40 bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-gray-100 focus:ring-2 focus:ring-cyan-400 outline-none"
        />
      </section>

      {/* Ações */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <button
          onClick={salvarRascunhoTeste}
          className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 hover:shadow-[0_0_10px_rgba(16,185,129,0.5)] transition"
        >
          Salvar teste
        </button>
        <Link
          to="/avaliacao"
          className="px-6 py-3 border border-neutral-800 text-gray-400 rounded-lg font-semibold hover:bg-neutral-800 hover:text-gray-200 transition"
        >
          Voltar
        </Link>
      </div>
    </main>
  </div>
);
}
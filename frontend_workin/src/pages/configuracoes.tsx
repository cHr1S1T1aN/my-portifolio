import React, { useState, useEffect, useRef } from "react";
import type { Empresa } from "./types";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Mascote from "../assets/mascosteini.png";
import VagasFinalizadas from "./vagasfinalizadas";

// =================== CONFIGURAÇÕES DA CONTA ===================
const ConfiguracoesConta: React.FC<{ empresaData: Empresa; onUpdate: (data: Partial<Empresa>) => Promise<void> }> = ({
  empresaData,
  onUpdate,
}) => {
  const [dados, setDados] = useState<Partial<Empresa>>(empresaData);

  useEffect(() => {
    if (empresaData && Object.keys(empresaData).length > 0) {
      setDados((prev) => ({
        ...prev,
        ...empresaData,
      }));
    }
  }, [empresaData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDados({ ...dados, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(dados);
  };

  return (
    <div className="p-8 bg-neutral-900 text-gray-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-sky-400">Configurações da Conta</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Nome da Empresa", name: "nomeEmpresa" },
            { label: "CNPJ", name: "cnpj" },
            { label: "E-mail Corporativo", name: "emailCorporativo" },
            { label: "Telefone", name: "telefoneContato" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-300">{label}</label>
              <input
                type="text"
                name={name}
                value={(dados as any)[name] || ""}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-neutral-800 border border-neutral-700 p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Endereço Completo</label>
          <input
            type="text"
            name="enderecoCompleto"
            value={dados.enderecoCompleto || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-neutral-800 border border-neutral-700 p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Nome do Responsável", name: "nomeResponsavel" },
            { label: "Cargo do Responsável", name: "cargoResponsavel" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-300">{label}</label>
              <input
                type="text"
                name={name}
                value={(dados as any)[name] || ""}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-neutral-800 border border-neutral-700 p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          ))}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 rounded-md text-white bg-sky-600 hover:bg-sky-500 transition"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};

// =================== PERSONALIZAR PERFIL ===================
const PersonalizarPerfil: React.FC<{ empresaData: Empresa; onUpdate: (data: Partial<Empresa>) => Promise<void> }> = ({
  empresaData,
  onUpdate,
}) => {
  const [descricao, setDescricao] = useState(empresaData.descricaoEmpresa || "");
  const [urlLogo, setUrlLogo] = useState(empresaData.urlLogo || Mascote);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (empresaData && Object.keys(empresaData).length > 0) {
      setDescricao(empresaData.descricaoEmpresa || "");
      setUrlLogo(empresaData.urlLogo || Mascote);
    }
  }, [empresaData]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    toast.loading("Fazendo upload...");
    await new Promise((r) => setTimeout(r, 1500));
    setUrlLogo(URL.createObjectURL(file));
    toast.dismiss();
    toast.success("Foto carregada!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate({ descricaoEmpresa: descricao, urlLogo });
  };

  return (
    <div className="p-8 bg-neutral-900 text-gray-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-sky-400">Personalizar Perfil</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
        <div className="flex flex-col items-center space-y-4">
          <img
            src={urlLogo}
            alt="Logo da Empresa"
            className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-neutral-700 cursor-pointer hover:border-sky-500 transition"
            onClick={() => fileInputRef.current?.click()}
          />
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-sky-400 hover:text-sky-300 text-sm font-medium"
          >
            Editar Foto da Empresa
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Descrição da Empresa</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md bg-neutral-800 border border-neutral-700 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-md text-white bg-sky-600 hover:bg-sky-500 transition"
          >
            Adicionar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};

// =================== SOBRE / CONTATO / POLÍTICAS / EXCLUIR ===================
const Sobre = () => (
  <div className="p-8 bg-neutral-900 text-gray-200">
    <h2 className="text-3xl font-bold mb-6 text-sky-400">Sobre Nós</h2>
    <p className="text-gray-400 leading-relaxed">
      A <strong>FiveConnect</strong> surgiu com o propósito de resolver um dos maiores desafios do mercado de trabalho atual: conectar empresas a profissionais qualificados.
    </p>
    <p className="mt-4 text-gray-400 leading-relaxed">
      Nosso produto, o <strong>Work-in</strong>, une empresas e candidatos com acessibilidade e inovação.
    </p>
  </div>
);

const Contato = () => (
  <div className="flex justify-center items-center min-h-[70vh] w-full">
    <div className="flex flex-col items-center gap-6 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg w-full max-w-3xl p-10 text-center">
      <h2 className="text-3xl font-bold text-sky-400">Contato</h2>
      <p className="text-gray-400 max-w-md">
        Tem dúvidas ou sugestões? Entre em contato com nossa equipe:
      </p>
      <ul className="text-gray-300 space-y-2">
        <li>Email: suporte@workintech.com.br</li>
        <li>Telefone: (11) 99999-9999</li>
        <li>Atendimento: Segunda a Sexta, das 9h às 18h</li>
      </ul>
    </div>
  </div>
);


// =================== POLÍTICAS E TERMOS ===================
const PoliticasTermos: React.FC = () => (
  <div className="bg-neutral-900 text-gray-300 py-16 px-6">
    <div className="max-w-4xl mx-auto">
      {/* ======== POLÍTICA DE PRIVACIDADE ======== */}
      <h1 className="text-3xl md:text-4xl font-bold text-sky-400 mb-6">
        Política de Privacidade – Plataforma WorkIn
      </h1>

      <p className="text-gray-400">
        Última atualização: <strong>22 de outubro de 2025</strong>
      </p>

      <p className="text-gray-400">
        A <strong>WorkIn</strong> respeita e protege a privacidade dos seus
        usuários e parceiros. Esta Política explica como coletamos,
        utilizamos, armazenamos e protegemos os seus dados pessoais, em
        conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD –
        Lei nº 13.709/2018)</strong>.
      </p>

      <h2 className="text-2xl font-semibold text-sky-400 mt-8 mb-3">
        1. Dados Coletados
      </h2>
      <ul className="list-disc ml-6 space-y-2 mb-6">
        <li>Nome da empresa e do responsável</li>
        <li>CNPJ e e-mail corporativo</li>
        <li>Telefone e endereço comercial</li>
        <li>Logo e/ou imagem de perfil</li>
        <li>Dados de uso e logs de acesso (IP, horário, navegador)</li>
      </ul>

      <h2 className="text-2xl font-semibold text-sky-400 mt-8 mb-3">
        2. Finalidade do Tratamento
      </h2>
      <p className="text-gray-400"></p>
      <ul className="list-disc ml-6 space-y-2 mb-6">
        <li>Gerar e gerenciar contas de acesso à plataforma</li>
        <li>Permitir comunicação entre empresas e candidatos</li>
        <li>Enviar notificações e atualizações sobre o sistema</li>
        <li>Cumprir obrigações legais e regulatórias</li>
        <li>Melhorar a experiência e segurança dos usuários</li>
      </ul>

      <h2 className="text-2xl font-semibold text-sky-400 mt-8 mb-3">
        3. Direitos do Titular
      </h2>
      <p className="text-gray-400">
        De acordo com a LGPD, você pode, a qualquer momento:
      </p>
      <ul className="list-disc ml-6 space-y-2 mb-6">
        <li>Confirmar a existência de tratamento de dados</li>
        <li>Acessar, corrigir ou atualizar informações pessoais</li>
        <li>Solicitar exclusão ou anonimização dos dados</li>
        <li>Revogar o consentimento dado anteriormente</li>
      </ul>

      <p className="text-gray-400">
        Para exercer seus direitos, entre em contato pelo e-mail:{" "}
        <a
          href="mailto:dpo@workin.app"
          className="text-sky-500 underline hover:text-sky-400"
        >
          dpo@workin.app
        </a>{" "}
        — prazo máximo de resposta: <strong>15 dias corridos</strong>.
      </p>

      {/* ======== DIVISOR ======== */}
      <div className="border-t border-gray-300 my-10"></div>

      {/* ======== TERMOS DE USO ======== */}
      <h1 className="text-3xl md:text-4xl font-bold text-sky-400 mb-6">
        Termos de Uso – Plataforma WorkIn
      </h1>

      <p className="text-gray-400">
        Última atualização: <strong>22 de outubro de 2025</strong>
      </p>

      <p className="text-gray-400">
        Bem-vindo à <strong>WorkIn</strong>! Ao acessar ou utilizar nossa
        plataforma, você concorda com os seguintes Termos de Uso. É importante
        que leia atentamente antes de continuar utilizando nossos serviços.
      </p>

      <h2 className="text-2xl font-semibold text-sky-400 mt-8 mb-3">
        1. Uso da Plataforma
      </h2>
      <p className="text-gray-400">
        A WorkIn é destinada a empresas, estudantes e profissionais em busca de
        oportunidades e desenvolvimento. Qualquer uso indevido, como divulgação
        de informações falsas ou ofensivas, poderá resultar na suspensão da
        conta.
      </p>

      <h2 className="text-2xl font-semibold text-sky-400 mt-8 mb-3">
        2. Privacidade e Dados
      </h2>
      <p className="text-gray-400">
        Levamos sua privacidade a sério. As informações fornecidas são
        utilizadas conforme nossa Política de Privacidade e não são
        compartilhadas com terceiros sem o seu consentimento.
      </p>

      <h2 className="text-2xl font-semibold text-sky-400 mt-8 mb-3">
        3. Responsabilidades do Usuário
      </h2>
      <p className="text-gray-400">
        O usuário é responsável por manter a veracidade dos dados informados e
        pelo uso adequado da plataforma. Qualquer atividade ilegal ou que viole
        estes termos poderá resultar em bloqueio de acesso.
      </p>

      <h2 className="text-2xl font-semibold text-sky-400 mt-8 mb-3">
        4. Alterações dos Termos
      </h2>
      <p className="text-gray-400">
        A WorkIn reserva-se o direito de modificar estes Termos a qualquer
        momento, sendo as alterações comunicadas por meio da própria plataforma.
        O uso contínuo após atualizações implica aceitação das novas condições.
      </p>

      <h2 className="text-2xl font-semibold text-sky-400 mt-8 mb-3">
        5. Contato
      </h2>
      <p className="text-gray-400">
        Em caso de dúvidas sobre estes Termos, entre em contato conosco pelo
        e-mail{" "}
        <a
          href="mailto:support@workin.app"
          className="text-sky-500 underline hover:text-sky-400"
        >
          support@workin.app
        </a>
        .
      </p>
        <p>© {new Date().getFullYear()} WorkIn. Todos os direitos reservados.</p>
      </div>
    </div>
);


const ExcluirConta = ({
  empresaId,
  navigate,
}: {
  empresaId: string;
  navigate: ReturnType<typeof useNavigate>;
}) => {
  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja excluir permanentemente?")) return;
    toast.loading("Excluindo conta...");
    try {
      await axios.delete(`https://projeto-startup.onrender.com/empresas/${empresaId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("empresaToken")}` },
      });
      localStorage.removeItem("empresa");
      localStorage.removeItem("empresaToken");
      toast.dismiss();
      toast.success("Conta excluída!");
      setTimeout(() => navigate("/"), 2000);
    } catch {
      toast.dismiss();
      toast.error("Erro ao excluir conta.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-gray-100 px-6">
      <div className="max-w-md w-full bg-neutral-900/70 backdrop-blur-md border border-neutral-800 rounded-2xl shadow-lg p-8 text-center transition-all duration-300 hover:shadow-red-500/10">
        <h2 className="text-3xl font-bold mb-4 text-red-500">
          ⚠️ Excluir Conta
        </h2>
        <p className="text-gray-400 mb-6">
          Essa ação é <span className="text-red-400 font-semibold">irreversível</span>. <br />
          Todos os seus dados e vagas serão apagados permanentemente.
        </p>
        <button
          onClick={handleDelete}
          className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-md hover:shadow-red-600/40 transition-all duration-200 active:scale-95"
        >
          Excluir Conta Permanentemente
        </button>
        <p className="text-xs text-gray-500 mt-4">
          Certifique-se de que realmente deseja prosseguir.
        </p>
      </div>
    </div>
  );
};

// =================== COMPONENTE PRINCIPAL ===================
const Configuracoes = () => {
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [activeTab, setActiveTab] = useState<
    "perfil" | "conta" | "sobre" | "contato" | "politicas" | "excluir" | "finalizadas"
  >("perfil");

  useEffect(() => {
    const stored = localStorage.getItem("empresa");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const empresaData = parsed.empresa ?? parsed;
        setEmpresa(empresaData);
      } catch {
        localStorage.removeItem("empresa");
      }
    }
  }, []);

  const handleUpdate = async (data: Partial<Empresa>) => {
    if (!empresa?.id) return;
    const token = localStorage.getItem("empresaToken");
    if (!token) return;
    try {
      toast.loading("Salvando...");
      await axios.put(`https://projeto-startup.onrender.com/empresas/${empresa.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data: empresaAtualizada } = await axios.get(`https://projeto-startup.onrender.com/empresas/${empresa.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const empresaFinal = empresaAtualizada.empresa || empresaAtualizada;
      setEmpresa(empresaFinal);
      localStorage.setItem("empresa", JSON.stringify(empresaFinal));
      toast.dismiss();
      toast.success("Alterações salvas!");
    } catch {
      toast.dismiss();
      toast.error("Erro ao atualizar.");
    }
  };

  const renderContent = () => {
    if (!empresa) return null;

    const plano = empresa.plano;

    switch (activeTab) {
      case "perfil":
        return <PersonalizarPerfil empresaData={empresa} onUpdate={handleUpdate} />;
      case "conta":
        return <ConfiguracoesConta empresaData={empresa} onUpdate={handleUpdate} />;
      case "sobre":
        return <Sobre />;
      case "contato":
        return <Contato />;
      case "politicas":
        return <PoliticasTermos />;
      case "excluir":
        return <ExcluirConta empresaId={empresa.id} navigate={navigate} />;
      case "finalizadas":
        return plano === "medio" || plano === "avancado" ? (
          <VagasFinalizadas />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-gray-400">
            <p className="text-lg mb-2">🔒 Função exclusiva para planos Médio e Avançado</p>
            <p className="text-sm mb-4">
              Atualize seu plano para acessar suas vagas finalizadas e estatísticas avançadas.
            </p>
            <button
              onClick={() => navigate("/premium")}
              className="px-6 py-2 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 transition"
            >
              Ver planos disponíveis
            </button>
          </div>
        );
    }
  };

  const NavItem = ({ tab, label }: { tab: typeof activeTab; label: string }) => (
    <li
      className={`p-4 cursor-pointer transition ${
        activeTab === tab
          ? "bg-neutral-800 text-sky-400 border-l-4 border-sky-500"
          : "text-gray-400 hover:bg-neutral-800 hover:text-white"
      }`}
      onClick={() => setActiveTab(tab)}
    >
      {label}
    </li>
  );

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-neutral-950 p-4 md:p-10 text-gray-100">
        <div className="max-w-7xl mx-auto bg-neutral-900 shadow-2xl rounded-lg overflow-hidden md:flex border border-neutral-800">
          <div className="w-full md:w-64 bg-neutral-900 border-r border-neutral-800">
            <ul className="divide-y divide-neutral-800">
              <NavItem tab="perfil" label="Personalizar Perfil" />
              <NavItem tab="conta" label="Configurações da Conta" />
              <NavItem tab="sobre" label="Sobre Nós" />
              <NavItem tab="contato" label="Contato" />
              <NavItem tab="politicas" label="Políticas e Termos" />
              <NavItem tab="excluir" label="Excluir Conta" />

              {/* Só mostra a aba se o plano for "medio" ou "avancado" */}
              {(empresa?.plano === "medio" || empresa?.plano === "avancado") && (
                <NavItem tab="finalizadas" label="Vagas Finalizadas" />
              )}
            </ul>
          </div>

          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </>
  );
};

export default Configuracoes;
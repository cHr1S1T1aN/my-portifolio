// src/pages/PoliticaPrivacidade.tsx


export default function PoliticaPrivacidade() {
  return (
    <div className="bg-[#0a0f1c] min-h-screen text-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-400 mb-6">
          Política de Privacidade – Plataforma WorkIn
        </h1>

        <p className="text-gray-300 mb-8">
          Última atualização: <strong>22 de outubro de 2025</strong>
        </p>

        <p className="mb-6">
          A <strong>WorkIn</strong> respeita e protege a privacidade dos seus
          usuários e parceiros. Esta Política explica como coletamos,
          utilizamos, armazenamos e protegemos os seus dados pessoais, em
          conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD –
          Lei nº 13.709/2018)</strong>.
        </p>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          1. Dados Coletados
        </h2>
        <ul className="list-disc ml-6 space-y-2 mb-6">
          <li>Nome da empresa e do responsável</li>
          <li>CNPJ e e-mail corporativo</li>
          <li>Telefone e endereço comercial</li>
          <li>Logo e/ou imagem de perfil</li>
          <li>Dados de uso e logs de acesso (IP, horário, navegador)</li>
        </ul>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          2. Finalidade do Tratamento
        </h2>
        <p className="mb-6">
          Os dados coletados são utilizados para:
        </p>
        <ul className="list-disc ml-6 space-y-2 mb-6">
          <li>Gerar e gerenciar contas de acesso à plataforma</li>
          <li>Permitir comunicação entre empresas e candidatos</li>
          <li>Enviar notificações e atualizações sobre o sistema</li>
          <li>Cumprir obrigações legais e regulatórias</li>
          <li>Melhorar a experiência e segurança dos usuários</li>
        </ul>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          3. Base Legal para o Tratamento
        </h2>
        <ul className="list-disc ml-6 space-y-2 mb-6">
          <li>Execução de contrato (art. 7º, V da LGPD)</li>
          <li>Consentimento do titular (art. 7º, I)</li>
          <li>Cumprimento de obrigação legal (art. 7º, II)</li>
          <li>Legítimo interesse do controlador (art. 7º, IX)</li>
        </ul>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          4. Armazenamento e Segurança
        </h2>
        <p className="mb-6">
          Os dados são armazenados de forma segura em servidores com acesso
          controlado e protegido por autenticação. Utilizamos criptografia
          (bcrypt) para senhas e tokens JWT com tempo de expiração limitado.
        </p>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          5. Compartilhamento de Dados
        </h2>
        <p className="mb-6">
          A WorkIn não compartilha informações pessoais com terceiros, exceto:
        </p>
        <ul className="list-disc ml-6 space-y-2 mb-6">
          <li>Quando exigido por lei ou decisão judicial</li>
          <li>Com prestadores de serviço que auxiliam na operação da plataforma (ex: hospedagem, e-mail, nuvem)</li>
          <li>Com consentimento explícito do usuário</li>
        </ul>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          6. Tempo de Retenção
        </h2>
        <p className="mb-6">
          Os dados serão mantidos enquanto a conta estiver ativa e poderão ser
          preservados por até 6 meses após a exclusão, apenas para fins de
          auditoria e conformidade legal.
        </p>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          7. Direitos do Titular
        </h2>
        <p className="mb-6">
          De acordo com a LGPD, você pode, a qualquer momento:
        </p>
        <ul className="list-disc ml-6 space-y-2 mb-6">
          <li>Confirmar a existência de tratamento de dados</li>
          <li>Acessar, corrigir ou atualizar informações pessoais</li>
          <li>Solicitar a exclusão ou anonimização dos dados</li>
          <li>Revogar o consentimento dado anteriormente</li>
          <li>Solicitar portabilidade para outro controlador</li>
        </ul>

        <p className="mb-6">
          Para exercer seus direitos, entre em contato conosco pelo e-mail:{" "}
          <a
            href="mailto:dpo@workin.app"
            className="text-sky-400 underline hover:text-sky-300"
          >
            dpo@workin.app
          </a>{" "}
          — prazo máximo de resposta: <strong>15 dias corridos</strong>.
        </p>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          8. Consentimento
        </h2>
        <p className="mb-6">
          Ao criar uma conta ou utilizar os serviços da WorkIn, o usuário declara
          que leu e concorda com esta Política de Privacidade e autoriza o
          tratamento de seus dados pessoais conforme descrito neste documento.
        </p>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          9. Alterações desta Política
        </h2>
        <p className="mb-6">
          A WorkIn reserva-se o direito de atualizar esta Política de
          Privacidade sempre que necessário. Alterações significativas serão
          comunicadas por meio da plataforma e entrarão em vigor na data da
          publicação.
        </p>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          10. Links Úteis e Referências
        </h2>
        <ul className="list-disc ml-6 space-y-2 mb-10">
          <li>
            <a
              href="https://getprivacy.com.br/o-que-e-como-elaborar-uma-politica-de-privacidade/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 underline hover:text-sky-300"
            >
              O que é e como elaborar uma política de privacidade
            </a>
          </li>
          <li>
            <a
              href="https://fullture.com/o-que-e-termo-de-uso/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 underline hover:text-sky-300"
            >
              O que são termos de uso?
            </a>
          </li>
          <li>
            <a
              href="https://blog.ateliware.com/lgpd-desenvolvimento-software/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 underline hover:text-sky-300"
            >
              Introdução à LGPD no desenvolvimento de software
            </a>
          </li>
        </ul>

        <div className="border-t border-gray-700 pt-6 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} WorkIn. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}

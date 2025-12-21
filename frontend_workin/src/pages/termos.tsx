export default function TermosUso() {
  return (
    <div className="bg-[#0a0f1c] min-h-screen text-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-400 mb-6">
          Termos de Uso – Plataforma WorkIn
        </h1>

        <p className="text-gray-300 mb-8">
          Última atualização: <strong>22 de outubro de 2025</strong>
        </p>

        <p className="mb-6">
          Bem-vindo à <strong>WorkIn</strong>. Ao utilizar nossa plataforma, você
          concorda com os presentes Termos de Uso, que regem o acesso e o uso de
          nossos serviços. Caso não concorde, recomendamos que não utilize a
          plataforma.
        </p>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          1. Aceitação dos Termos
        </h2>
        <p className="mb-6">
          Ao acessar a WorkIn, o usuário declara ter lido, compreendido e
          aceitado integralmente as disposições destes Termos de Uso e da
          Política de Privacidade. O uso contínuo da plataforma implica
          concordância automática com futuras atualizações.
        </p>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          2. Definições
        </h2>
        <ul className="list-disc ml-6 space-y-2 mb-6">
          <li>
            <strong>Usuário:</strong> pessoa física ou jurídica que utiliza os
            serviços da plataforma.
          </li>
          <li>
            <strong>Empresa:</strong> organização que cadastra vagas, desafios ou
            projetos.
          </li>
          <li>
            <strong>Candidato:</strong> indivíduo que se inscreve e participa dos
            processos seletivos.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          3. Uso da Plataforma
        </h2>
        <p className="mb-6">
          A plataforma WorkIn deve ser utilizada de forma ética e responsável.
          É proibido:
        </p>
        <ul className="list-disc ml-6 space-y-2 mb-6">
          <li>Fornecer informações falsas ou enganosas;</li>
          <li>Usar a plataforma para fins ilegais ou imorais;</li>
          <li>Compartilhar credenciais de acesso com terceiros;</li>
          <li>Praticar atos que prejudiquem o funcionamento do sistema;</li>
          <li>Coletar dados de outros usuários sem consentimento.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          4. Responsabilidades da Empresa
        </h2>
        <p className="mb-6">
          As empresas são responsáveis pelas informações publicadas em suas
          vagas, desafios e avaliações, comprometendo-se a não divulgar conteúdo
          discriminatório, ofensivo ou que viole a legislação vigente.
        </p>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          5. Responsabilidades do Candidato
        </h2>
        <p className="mb-6">
          O candidato deve garantir a veracidade das informações prestadas em seu
          perfil e nos desafios realizados. Qualquer tentativa de fraude pode
          resultar em suspensão ou exclusão da conta.
        </p>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          6. Propriedade Intelectual
        </h2>
        <p className="mb-6">
          Todo o conteúdo disponibilizado pela WorkIn (design, marca, textos,
          códigos e funcionalidades) é protegido por direitos autorais e não pode
          ser copiado, reproduzido ou distribuído sem autorização prévia.
        </p>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          7. Limitação de Responsabilidade
        </h2>
        <p className="mb-6">
          A WorkIn não se responsabiliza por danos diretos ou indiretos
          decorrentes do uso da plataforma, incluindo perda de dados, lucros
          cessantes ou mau uso das informações por terceiros.
        </p>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          8. Suspensão e Encerramento
        </h2>
        <p className="mb-6">
          A WorkIn reserva-se o direito de suspender ou encerrar o acesso de
          usuários que violem estes Termos de Uso, sem necessidade de aviso
          prévio.
        </p>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          9. Alterações dos Termos
        </h2>
        <p className="mb-6">
          Estes Termos podem ser atualizados periodicamente. As alterações serão
          comunicadas na própria plataforma e entrarão em vigor na data de
          publicação.
        </p>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          10. Contato e Suporte
        </h2>
        <p className="mb-10">
          Em caso de dúvidas sobre estes Termos, entre em contato pelo e-mail{" "}
          <a
            href="mailto:support@workin.app"
            className="text-sky-400 underline hover:text-sky-300"
          >
            support@workin.app
          </a>.
        </p>

        <div className="border-t border-gray-700 pt-6 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} WorkIn. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}

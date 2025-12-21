export default function ComoFunciona() {
  return (
    <div className="bg-[#0a0f1c] min-h-screen text-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-400 mb-6">
          Como Funciona
        </h1>

        <p className="text-gray-300 mb-8">
          A <strong>Work-In</strong> é uma plataforma completa para empresas que desejam contratar com mais agilidade, inteligência e segurança. Aqui você encontra todas as ferramentas necessárias para divulgar vagas, avaliar candidatos e gerenciar sua equipe de forma prática.
        </p>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          Funcionalidades disponíveis para sua empresa
        </h2>

        <ul className="list-disc ml-6 space-y-2 mb-6">
          <li><strong>Cadastro corporativo:</strong> Crie sua conta empresarial com dados completos e seguros.</li>
          <li><strong>Login com autenticação:</strong> Acesse seu painel com segurança usando e-mail e senha protegidos por criptografia.</li>
          <li><strong>Dashboard exclusivo:</strong> Visualize suas informações, edite dados da empresa e acesse todas as funcionalidades em um só lugar.</li>
          <li><strong>Criação de vagas:</strong> Cadastre oportunidades com título, descrição, requisitos, local e faixa salarial.</li>
          <li><strong>Gerenciamento de vagas:</strong> Edite, exclua ou visualize todas as vagas criadas pela sua empresa.</li>
          <li><strong>Testes e projetos técnicos:</strong> Crie desafios personalizados para avaliar candidatos com base em habilidades reais.</li>
          <li><strong>Acompanhamento de candidatos:</strong> Veja quem está participando dos testes e projetos, e acompanhe o progresso de cada um.</li>
          <li><strong>Ranking de desempenho:</strong> Classifique os candidatos com base nos resultados dos testes e projetos realizados.</li>
          <li><strong>Edição de dados empresariais:</strong> Atualize informações como nome, e-mail, telefone, endereço e responsável diretamente pelo painel.</li>
          <li><strong>Upload de logotipo:</strong> Personalize sua conta com a identidade visual da sua empresa.</li>
          <li><strong>Recuperação de senha:</strong> Caso esqueça sua senha, solicite um link de redefinição diretamente pelo site.</li>
          <li><strong>Sessão segura:</strong> Sua empresa permanece conectada com segurança e pode sair a qualquer momento com apenas um clique.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          Experiência otimizada
        </h2>

        <ul className="list-disc ml-6 space-y-2 mb-6">
          <li>Interface moderna e responsiva para desktop e mobile</li>
          <li>Feedbacks visuais com alertas de sucesso e erro</li>
          <li>Navegação intuitiva com menus claros e botões de ação</li>
          <li>Design profissional com gradientes, ícones e tipografia elegante</li>
        </ul>

        <div className="border-t border-gray-700 pt-6 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Work-In. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}

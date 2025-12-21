export default function CentralAjuda() {
  return (
    <div className="bg-[#0a0f1c] min-h-screen text-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-400 mb-6">
          Central de Ajuda
        </h1>

        <p className="text-gray-300 mb-8">
          Bem-vindo à Central de Ajuda da <strong>Work-In</strong>. Aqui você encontra orientações sobre como usar a plataforma, resolver dúvidas comuns e aproveitar ao máximo todas as funcionalidades disponíveis para sua empresa.
        </p>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          Dúvidas frequentes
        </h2>

        <ul className="list-disc ml-6 space-y-2 mb-6">
          <li><strong>Como cadastrar minha empresa?</strong> Acesse a página de cadastro, preencha todos os campos obrigatórios e clique em "Cadastrar".</li>
          <li><strong>Esqueci minha senha. O que fazer?</strong> Clique em "Esqueci minha senha" na tela de login. Você receberá um link para redefinir sua senha.</li>
          <li><strong>Como criar uma vaga?</strong> Após o login, vá até o Dashboard e clique em "Criar Vaga". Preencha os dados e salve.</li>
          <li><strong>Posso editar os dados da minha empresa?</strong> Sim. No menu "Configurações", você pode atualizar nome, e-mail, telefone, endereço e responsável.</li>
          <li><strong>Como funciona o ranking de candidatos?</strong> Os candidatos são avaliados com base nos testes e projetos realizados. O sistema gera um ranking automático por desempenho.</li>
          <li><strong>Onde vejo os candidatos que aplicaram?</strong> Dentro de cada vaga, você pode visualizar os candidatos e acompanhar o progresso deles.</li>
          <li><strong>Como faço logout?</strong> Clique no botão "Sair" no topo da página. Sua sessão será encerrada com segurança.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-sky-300 mt-8 mb-3">
          Fale com a gente
        </h2>

        <p className="text-gray-300 mb-2">
          Se você tiver dúvidas, sugestões ou precisar de ajuda personalizada, entre em contato com nosso time de suporte:
        </p>

        <ul className="list-none ml-0 space-y-2 mb-6">
          <li><strong>📧 E-mail:</strong> <a href="mailto:fiveconnecct@gmail.com" className="text-sky-400 hover:underline">fiveconnecct@gmail.com</a></li>
          <li><strong>📞 Telefone:</strong> (11) 99999-9999</li>
          <li><strong>📱 Instagram:</strong> <a href="https://www.instagram.com/five_connectt/" target="_blank" className="text-sky-400 hover:underline">@five_connectt</a></li>
        </ul>

        <p className="text-gray-400 text-sm">
          Atendimento de segunda a sexta, das 9h às 18h.
        </p>

        <div className="border-t border-gray-700 pt-6 text-sm text-gray-400 mt-10">
          <p>© {new Date().getFullYear()} Work-In. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}

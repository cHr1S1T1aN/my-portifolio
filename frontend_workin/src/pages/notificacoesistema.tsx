export default function NotificacoesSistema() {
  const notificacoes = [
    {
      id: 1,
      titulo: "Atualização de segurança",
      mensagem: "Atualizamos nossos termos de uso. Confira as mudanças.",
      data: "2025-10-28T10:00:00Z",
    },
    {
      id: 2,
      titulo: "Nova funcionalidade",
      mensagem: "Agora você pode avaliar candidatos diretamente pelo painel.",
      data: "2025-10-27T14:30:00Z",
    },
  ];

  return (
    <ul className="space-y-6">
      {notificacoes.map((n) => (
        <li
          key={n.id}
          className="bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 shadow-lg hover:-translate-y-1 hover:shadow-cyan-500/10 transition-all duration-300"
        >
          <h2 className="text-xl font-semibold text-cyan-400 mb-2">{n.titulo}</h2>
          <p className="text-gray-300 leading-relaxed">{n.mensagem}</p>
          <p className="text-sm text-gray-500 mt-3">
            {new Date(n.data).toLocaleString("pt-BR")}
          </p>
        </li>
      ))}
    </ul>
  );
}

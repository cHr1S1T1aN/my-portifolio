//Tipos globais do sistema WorkIn

// ✅ Questionário
export interface Questionario {
  id: string;
  titulo: string;
  empresaId: string;
  perguntas: number;
}

// ✅ Empresa
export interface Empresa {
  id: string;
  nomeEmpresa: string;
  cnpj: string;
  emailCorporativo: string;
  telefoneContato: string;
  enderecoCompleto: string;
  nomeResponsavel: string;
  cargoResponsavel: string;
  senha: string;
  descricaoEmpresa?: string;
  urlLogo?: string;
  plano: "padrao" | "medio" | "avancado";
  // 🔹 Campos opcionais usados na recuperação de senha
  resetToken?: string | null;
  resetTokenExpiraEm?: string | null;

  // 🔹 Novo campo de verificação de e-mail
  emailVerified?: boolean; // 👈 adiciona essa linha
}

// ✅ Projeto
export interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  empresaId: string;
}

// ✅ Vaga
export interface Vaga {
  id: string;
  area: string;
  salario: number;
  descricao: string;
  empresaId?: string; // opcional, pode ser associado a uma empresa no futuro
}
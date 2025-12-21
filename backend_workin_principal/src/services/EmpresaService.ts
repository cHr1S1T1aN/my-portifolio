import { db } from "../config/firebase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Empresa } from "../types/types";

export class EmpresaService {
  private collection = db.collection("empresas");

  async listarEmpresas() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async buscarEmpresaPorId(id: string) {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async verificarStatusPorEmail(emailCorporativo: string) {
    const snapshot = await this.collection
      .where("emailCorporativo", "==", emailCorporativo.trim().toLowerCase())
      .get();

    if (snapshot.empty) throw new Error("Empresa não encontrada.");

    const empresa = snapshot.docs[0].data();
    return { emailVerified: empresa.emailVerified };
  }

  async criarEmpresa(dados: any) {
    const {
      nomeEmpresa,
      cnpj,
      emailCorporativo,
      telefoneContato,
      enderecoCompleto,
      nomeResponsavel,
      cargoResponsavel,
      senha,
    } = dados;

    if (
      !nomeEmpresa ||
      !cnpj ||
      !emailCorporativo ||
      !telefoneContato ||
      !enderecoCompleto ||
      !nomeResponsavel ||
      !cargoResponsavel ||
      !senha
    ) {
      throw new Error("Preencha todos os campos obrigatórios.");
    }

    const emailNormalizado = emailCorporativo.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailNormalizado)) {
      throw new Error("E-mail inválido! Use o formato nome@dominio.com.");
    }

    const empresaExistente = await this.collection
      .where("emailCorporativo", "==", emailNormalizado)
      .get();

    if (!empresaExistente.empty) {
      throw new Error("Já existe uma empresa com este e-mail.");
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const empresa = {
      nomeEmpresa,
      cnpj,
      emailCorporativo: emailNormalizado,
      telefoneContato,
      enderecoCompleto,
      nomeResponsavel,
      cargoResponsavel,
      senha: senhaHash,
      criadoEm: new Date().toISOString(),
      emailVerified: false,
      plano: "padrao", // ✅ define plano padrão no cadastro
    };

    const docRef = await this.collection.add(empresa);

    try {
 //     await this.enviarEmailVerificacao(emailNormalizado, docRef.id);
    } catch (err) {
      console.warn("Falha ao enviar e-mail de verificação:", err);
    }

    const token = jwt.sign(
      { id: docRef.id, emailCorporativo },
      process.env.JWT_SECRET || "segredo_temporario",
      { expiresIn: "2h" }
    );

    const { senha: _, ...empresaSemSenha } = empresa;
    return { token, empresa: { id: docRef.id, ...empresaSemSenha } };
  }

  /*async enviarEmailVerificacao(emailCorporativo: string, empresaId: string) {
    const token = jwt.sign(
      { id: empresaId, emailCorporativo },
      process.env.JWT_SECRET || "segredo_temporario",
      { expiresIn: "1d" }
    );

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const link = `${frontendUrl}/verificar-email/${token}`;

    if (
      !process.env.EMAIL_HOST ||
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS
    ) {
      console.warn("Variáveis de ambiente de e-mail não configuradas.");
      return { message: "E-mail de verificação não enviado (modo local)." };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 587),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"WorkIn Suporte" <${process.env.EMAIL_USER}>`,
      to: emailCorporativo,
      subject: "Verifique seu e-mail - WorkIn",
      html: `
        <h2>Confirmação de E-mail</h2>
        <p>Olá! Obrigado por se cadastrar na <strong>WorkIn</strong>.</p>
        <p>Para ativar sua conta, clique no botão abaixo:</p>
        <a href="${link}" style="background-color: #0ea5e9; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none;">Verificar e-mail</a>
        <p>Se você não criou uma conta, ignore este e-mail.</p>
      `,
    });

    console.log(`E-mail de verificação enviado para ${emailCorporativo}`);
    return { message: "E-mail de verificação enviado." };
  }

  async verificarEmail(token: string) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "segredo_temporario"
      ) as { id: string };

      const empresaRef = this.collection.doc(decoded.id);
      const empresaDoc = await empresaRef.get();

      if (!empresaDoc.exists) throw new Error("Empresa não encontrada.");

      const empresaData = empresaDoc.data() as Empresa;

      if (empresaData.emailVerified) {
        return { message: "E-mail já verificado anteriormente." };
      }

      await empresaRef.update({ emailVerified: true });
      console.log(`E-mail verificado: ${empresaData.emailCorporativo}`);
      return { message: "E-mail verificado com sucesso!" };
    } catch {
      throw new Error("Link de verificação inválido ou expirado.");
    }
  }
*/
  async loginEmpresa(emailCorporativo: string, senha: string) {
    const snapshot = await this.collection
      .where("emailCorporativo", "==", emailCorporativo)
      .get();

    if (snapshot.empty) throw new Error("E-mail ou senha incorretos.");

    const empresaDoc = snapshot.docs[0];
    const empresa = empresaDoc.data() as Empresa;

    //if (process.env.NODE_ENV === "production" && !empresa.emailVerified) {
    //  throw new Error("E-mail ainda não verificado. Verifique sua caixa de entrada.");
  //  }

    const senhaCorreta = await bcrypt.compare(senha, empresa.senha);
    if (!senhaCorreta) throw new Error("E-mail ou senha incorretos.");

    const token = jwt.sign(
      { id: empresaDoc.id, emailCorporativo },
      process.env.JWT_SECRET || "segredo_temporario",
      { expiresIn: "2h" }
    );

    const { senha: _, ...empresaSemSenha } = empresa;
    return {
      token,
      empresa: {
        ...empresaSemSenha,
        id: empresaDoc.id,
        plano: empresa.plano || "padrao", // ✅ garante que o plano venha sempre
      },
    };
    }

  async atualizarEmpresa(id: string, dados: Partial<Empresa>) {
    const camposPermitidos = [
      "nomeEmpresa",
      "cnpj",
      "emailCorporativo",
      "telefoneContato",
      "enderecoCompleto",
      "nomeResponsavel",
      "cargoResponsavel",
      "descricaoEmpresa",
      "urlLogo",
    ] as const;

    const updatePayload: Partial<Empresa> = {};

    for (const key of camposPermitidos) {
      if (key in dados && dados[key] !== undefined) {
        if (typeof dados[key] === "string") {
          (updatePayload as any)[key] = (dados[key] as string).trim();
        } else {
          (updatePayload as any)[key] = dados[key];
        }
      }
    }

    if (Object.keys(updatePayload).length === 0) {
      throw new Error("Nenhum dado válido fornecido para atualização.");
    }

    await this.collection.doc(id).update(updatePayload);
    const doc = await this.collection.doc(id).get();
    return { id, ...doc.data() };
  }

  async deletarEmpresa(id: string) {
    await this.collection.doc(id).delete();
    return { message: "Empresa deletada com sucesso" };
  }

async solicitarRedefinicaoSenha(emailCorporativo: string) {
  const snapshot = await this.collection
    .where("emailCorporativo", "==", emailCorporativo)
    .get();

  if (snapshot.empty)
    throw new Error("Empresa não encontrada com este e-mail.");

  const empresaDoc = snapshot.docs[0];
  const empresaId = empresaDoc.id;

  const token = jwt.sign(
    { id: empresaId, emailCorporativo },
    process.env.JWT_SECRET || "segredo_temporario",
    { expiresIn: "15m" }
  );

  await this.collection.doc(empresaId).update({ resetToken: token });

  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const link = `${frontendUrl}/redefinir-senha?token=${token}`;

  // ✅ Adiciona o transporter aqui
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"WorkIn Suporte" <${process.env.EMAIL_USER}>`,
    to: emailCorporativo,
    subject: "Redefinição de senha - WorkIn",
    html: `
      <h2>Redefinição de Senha</h2>
      <p>Você solicitou a redefinição de senha da sua conta na <strong>WorkIn</strong>.</p>
      <p>Clique no link abaixo (válido por 15 minutos):</p>
      <a href="${link}" style="color: #0ea5e9; font-weight: bold;">Redefinir minha senha</a>
    `,
  });

  console.log(`E-mail de redefinição enviado para ${emailCorporativo}`);
  return { message: "E-mail de redefinição enviado com sucesso!" };
}


    async redefinirSenha(token: string, novaSenha: string) {
      console.log("🔐 Token recebido:", token);
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "segredo_temporario"
      ) as { id: string };

      const empresaRef = this.collection.doc(decoded.id);
      const empresaDoc = await empresaRef.get();

      if (!empresaDoc.exists) throw new Error("Empresa não encontrada.");

      const senhaHash = await bcrypt.hash(novaSenha, 10);
      await empresaRef.update({ senha: senhaHash, resetToken: null });

      return { message: "Senha redefinida com sucesso!" };
    } catch {
      throw new Error("Token inválido ou expirado.");
    }
  }
  async atualizarPlano(empresaId: string, plano: string) {
  await this.collection.doc(empresaId).update({ plano });
}
}

import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast"; 

// 🧩 Páginas
import Home from "./pages/home";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Dashboard from "./pages/dashboard";
import EsqueciSenha from "./pages/EsqueciSenha";
import Configuracoes from "./pages/configuracoes";
import CriarVaga from "./pages/CriarVaga";
import Premium from "./pages/premium";
import TermosUso from "./pages/termos";
import PoliticaPrivacidade from "./pages/politicasprivacidade";
import VerificarEmail from "./pages/VerificarEmail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ComoFunciona from "./pages/comofunciona";
import Candidatos from "./pages/vercandidatos";
import RedefinirSenha from "./pages/RedefinirSenha";
import Avaliacao from "./pages/avaliacao";
import Prova from "./pages/prova";
import Notificacoes from "./pages/notificacoes";
import CandidatoPerfil from "./pages/candidatoperfil";
import CentralAjuda from "./pages/centraldeajuda";
import VagasFinalizadas from "./pages/vagasfinalizadas";
import EditarVaga from "./pages/editarvagas";
import PagamentoSucesso from "./pages/pagamentosucesso";
import PagamentoFalhou from "./pages/pagamentofalhou";
import TestesDaVaga from "./pages/testedavaga";
import GerenciarTestes from "./pages/gerenciarteste";
import EditarTeste from "./pages/editarteste";
import Projeto from "./pages/projeto";
import AjudaProjetos from "./pages/ajudaprojetos";
import Resultados from "./pages/resultados";

// 🔒 Rota protegida
import PrivateRoute from "./components/privateroute";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const esconderHeaderFooter = [
    "/",
    "/login",
    "/cadastro",
    "/politicasprivacidade",
    "/termos",
    "/redefinir-senha",
    "/esqueci-senha",
    "/verificar-email",
    "/comofunciona",
    "/central-de-ajuda",
  ].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!esconderHeaderFooter && <Header />}

      <div className="flex-grow">
        <Routes>
          {/* 🌐 Páginas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/politicasprivacidade" element={<PoliticaPrivacidade />} />
          <Route path="/termos" element={<TermosUso />} />
          <Route path="/verificar-email/:token" element={<VerificarEmail />} />
          <Route path="/comofunciona" element={<ComoFunciona />} />
          <Route path="/central-de-ajuda" element={<CentralAjuda />} />

          {/* 🔐 Páginas privadas */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/configuracoes" element={<PrivateRoute><Configuracoes /></PrivateRoute>} />
          <Route path="/criar-vaga" element={<PrivateRoute><CriarVaga /></PrivateRoute>} />
          <Route path="/premium" element={<PrivateRoute><Premium /></PrivateRoute>} />
          <Route path="/pagaminir-senha" element={<PrivateRoute><RedefinirSenha /></PrivateRoute>} />
          <Route path="/esqueci-senha" element={<PrivateRoute><EsqueciSenha /></PrivateRoute>} />
          <Route path="/avaliento-sucesso" element={<PrivateRoute><PagamentoSucesso /></PrivateRoute>} />
          <Route path="/avaliacao" element={<PrivateRoute><Avaliacao /></PrivateRoute>} />
          <Route path="/avaliacao/prova" element={<PrivateRoute><Prova /></PrivateRoute>} />
          <Route path="/avaliacao/projeto" element={<PrivateRoute><Projeto /></PrivateRoute>} />
          <Route path="/notificacoes" element={<PrivateRoute><Notificacoes /></PrivateRoute>} />
          <Route path="/ver-candidatos" element={<PrivateRoute><Candidatos /></PrivateRoute>} />
          <Route path="/candidato/:id" element={<PrivateRoute><CandidatoPerfil /></PrivateRoute>} />
          <Route path="/vagas-finalizadas" element={<PrivateRoute><VagasFinalizadas /></PrivateRoute>} />
          <Route path="/editar-vaga/:id" element={<PrivateRoute><EditarVaga /></PrivateRoute>} />
          <Route path="/pagamento-falhou" element={<PrivateRoute><PagamentoFalhou /></PrivateRoute>} />
          <Route path="/vaga/:id/testes" element={<PrivateRoute><TestesDaVaga /></PrivateRoute>} />
          <Route path="/gerenciar-testes" element={<PrivateRoute><GerenciarTestes /></PrivateRoute>} />
          <Route path="/teste/:id/editar" element={<PrivateRoute><EditarTeste /></PrivateRoute>} />
          <Route path="/ajuda-projetos" element={<AjudaProjetos></AjudaProjetos>}/>
          <Route path="/resultados/:id" element={<Resultados />} />
        </Routes>
      </div>

      {!esconderHeaderFooter && <Footer />}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "linear-gradient(135deg, #0f172a 0%, #06b6d4 100%)",
            color: "#e0faff",
            fontWeight: "600",
            borderRadius: "12px",
            border: "1px solid rgba(94,234,212,0.3)",
            boxShadow: "0 0 20px rgba(6,182,212,0.5)",
          },
        }}
      />
    </div>
  );
}

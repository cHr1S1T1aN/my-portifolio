import { Link } from "react-router-dom";
import logo from "../assets/workinicone.png";
//import mascoteini from "../assets/mascosteini.png";
import GrupoDeEmpresarios from "../assets/a60d896f649b9f65da947a7e97a4e67b.jpg";
import GrupoDeEmpresarios2 from "../assets/0293b777cf365e5b80a0ba02eeb8d56c.jpg";
//import GrupoDeEmpresarios3 from "../assets/pexels-photo-3153207.jpeg";
import GrupoDeEmpresarios4 from "../assets/fotohome2.jpg";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white font-sans overflow-x-hidden relative">

      {/* ===== HEADER ===== */}
      <header className="top-0 left-0 flex justify-center md:justify-between items-center px-3 sm:px-10 py-4 bg-gray-950 z-50 border-gray-800">
      
        {/* Logo à esquerda */}
        <div className=" flex items-center space-x-2">
          <Link to="/">
            <img
              src={logo}
              alt="WorkIn Logo"
             className="h-57 w-auto md:h-34 hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Navegação à direita */}
        <nav className="hidden md:flex items-center space-x-8 text-lg font-semibold">
          <Link to="/login" className="hover:text-cyan-400 transition-colors duration-200">
            Login
          </Link>
          <Link to="/cadastro" className="hover:text-cyan-400 transition-colors duration-200">
            Cadastro
          </Link>
        </nav>
      </header>
      

      {/* ===== HERO ===== */}
      <section className="text-center pt-14 pb-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r 
                        from-cyan-400 via-blue-400 to-sky-600 bg-clip-text 
                        text-transparent leading-tight">
            Encontre o talento do futuro
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10">
            Conecte-se com grandes talentos universitários e transforme seu processo de recrutamento.
          </p>

          {/* 🔽 Botões sempre um embaixo do outro */}
          <div className="flex flex-col items-center gap-3">

            {/* Botão que aparece em todas telas */}
            <Link to="/login">
              <button
                className="w-full max-w-xs bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 
                          rounded-xl font-semibold shadow-lg transition-all hover:scale-105 mx-auto block"
              >
                Comece a Contratar Agora
              </button>
            </Link>

            {/* Botão que aparece SOMENTE no celular */}
            <Link to="/cadastro" className="block md:hidden">
              <button
                className="w-full max-w-xs mt-2 bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 
                          rounded-xl font-semibold shadow-lg transition-all hover:scale-105 mx-auto block"
              >
                Faça Seu Cadastro Agora
              </button>
            </Link>

          </div>
        </div>
      </section>


       {/* ===== SOBRE A WORK-IN ===== */}
      <section className="py-24 px-6 bg-gray-900 text-white border-t border-gray-800">
    <div className="max-w-6xl mx-auto text-center">

      <h2
        className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r 
                  from-indigo-400 to-blue-600 bg-clip-text text-transparent"
      >
        Como colaboramos para sua empresa encontrar talentos
      </h2>

      <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-6">
        A <span className="text-indigo-400 font-semibold">WorkIn</span> é uma plataforma desenvolvida para 
        facilitar a contratação no mercado de trabalho atual. Criamos um ambiente onde empresas podem 
        divulgar vagas com destaque, alcançar mais candidatos e acelerar o processo de seleção com 
        eficiência e clareza.
      </p>
        <div className="max-w-xl w-full mx-auto mb-14">
        <img
          src={GrupoDeEmpresarios4}
          alt="Equipe colaborando"
          className="w-full max-h-96 rounded-2xl hover:scale-105 transition-transform duration-500 object-cover"
        />
      </div>

      <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-10">

        <div className="bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-lg 
                        hover:-translate-y-1 hover:shadow-indigo-500/20 transition-all">
          <h3 className="text-indigo-400 text-xl font-bold mb-3">Maior Visibilidade</h3>
          <p className="text-gray-400 text-sm">
            Suas vagas ganham destaque e alcançam mais candidatos qualificados.
          </p>
        </div>

        <div className="bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-lg 
                        hover:-translate-y-1 hover:shadow-indigo-500/20 transition-all">
          <h3 className="text-indigo-400 text-xl font-bold mb-3">Contratação mais rápida</h3>
          <p className="text-gray-400 text-sm">
            Reduzimos etapas e otimizamos sua busca por talentos.
          </p>
        </div>

        <div className="bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-lg 
                        hover:-translate-y-1 hover:shadow-indigo-500/20 transition-all">
          <h3 className="text-indigo-400 text-xl font-bold mb-3">Conexões inteligentes</h3>
          <p className="text-gray-400 text-sm">
            Nossa plataforma indica bons candidatos que combinam com a vaga.
          </p>
        </div>

        </div>
      </div>
    </section>

      

      {/* ===== ETAPAS ===== */}
    <section className="py-16 md:py-20 bg-gray-800 border-y border-gray-800 px-4 md:px-6">

      {/* TÍTULO CENTRALIZADO */}
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-5xl font-bold mb-4">
          Contratar o talento ideal em 3 passos
        </h1>

        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Simplifique seu processo de recrutamento com nossa plataforma intuitiva
        </p>
      </div>
    {/* GRID DOS CARDS + IMAGEM */}
    <div className="max-w-6xl mx-auto 
                    flex flex-col-reverse 
                    md:grid md:grid-cols-2 
                    gap-12 items-center">

        {/* BLOCO DA ESQUERDA */}
        <div>
          <div className="grid sm:grid-cols-2 md:grid-cols-1 gap-8">
            {[
              {
                title: "1. Cadastre-se",
                text: "Crie sua conta empresarial em poucos minutos e configure seu perfil de recrutamento.",
              },
              {
                title: "2. Crie suas vagas",
                text: "Monte suas vagas e testes de forma personalizada e intuitiva.",
              },
              {
                title: "3. Encontre talentos!",
                text: "Acompanhe o desenvolvimento dos candidatos e contrate os melhores.",
              },
            ].map((item, i) => (
              <article
                key={i}
                className="bg-gray-900 rounded-2xl p-6 shadow-lg 
                          hover:shadow-cyan-400/10 transition-all hover:-translate-y-1"
              >
                <h4 className="font-bold text-xl mb-3 text-cyan-400">
                  {item.title}
                </h4>
                <p className="text-gray-300 text-sm md:text-base">{item.text}</p>
              </article>
            ))}
          </div>
        </div>

    {/* IMAGEM */}
    <div className="flex justify-center md:justify-end mt-6 md:mt-1">
      <img
        src={GrupoDeEmpresarios}
        alt="Equipe colaborando"
        className="w-full max-w-xl max-h-[440px] rounded-2xl hover:scale-105 
                   transition-transform duration-500 object-cover"
      />
    </div>
</div>
</section>


      {/* ===== BENEFÍCIOS ===== */}
      <section className="py-24 bg-cyan-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center px-6 
                        text-center md:text-left">
          
          <img
            src={GrupoDeEmpresarios2}
            alt="Imagem WorkIn"
            className="w-80 mx-auto rounded-2xl hover:scale-105 transition-transform duration-500"
          />

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 
                           to-blue-500 bg-clip-text text-transparent">
              Por que sua empresa precisa da Work-IN
            </h3>

            <p className="text-gray-400 mb-12 max-w-md">
              Transforme seu processo de recrutamento e encontre os melhores talentos com eficiência e estilo.
            </p>

            <div className="flex flex-col md:flex-row gap-10">
              {[
                {
                  icon: "⚡",
                  title: "Fortalecimento da marca",
                  text: "Aumente sua visibilidade entre jovens talentos e construa uma reputação sólida.",
                },
                {
                  icon: "⏱️",
                  title: "Otimização de tempo e custos",
                  text: "Reduza o tempo de contratação com nosso processo automatizado.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center max-w-xs"
                >
                  <div className="bg-gray-950/15 border border-cyan-700/20 w-14 h-14 
                                  rounded-full flex items-center justify-center mb-3 text-2xl">
                    {item.icon}
                  </div>

                  <h4 className="font-semibold mb-1 text-white">{item.title}</h4>

                  <p className="text-gray-400 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-20 md:py-28 text-center bg-gray-950 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Sua próxima grande contratação está a um clique de distância.
          </h2>

          <p className="text-gray-300 mb-8 md:mb-10 text-base md:text-lg">
            Junte-se às empresas que já descobriram o futuro do recrutamento universitário.
          </p>

          <Link to="/login">
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 
                               md:px-10 md:py-4 rounded-xl font-semibold shadow-lg 
                               shadow-cyan-600/30 transition-all hover:scale-105">
              Comece a Contratar Agora
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

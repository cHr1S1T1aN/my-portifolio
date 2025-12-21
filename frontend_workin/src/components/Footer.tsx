import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="p-8 text-sm text-white bg-gray-900">
      <div className="max-w-7xl mx-auto grid gap-8 
                      grid-cols-1 
                      sm:grid-cols-2 
                      md:grid-cols-3">

        {/* COLUNA 1 — SEMPRE APARECE */}
        <div className="text-center md:text-left">
          <img src={logo} alt="Work-In" className="w-24 mb-3 mx-auto md:mx-0" />
          <p className="text-gray-400">
            Conectando empresas aos melhores talentos universitários do Brasil.
          </p>
        </div>

        {/* COLUNA 2 — APARECE SOMENTE EM TELAS MÉDIAS PARA CIMA */}
        <div className="hidden md:block">
          <h4 className="mb-2 font-semibold">Serviços</h4>
          <ul className="space-y-1 text-gray-400">
            <li>
              <Link to="/comofunciona" className="hover:text-sky-400 transition-colors">
                Como Funciona
              </Link>
            </li>
            <li>
              <Link to="/termos" className="hover:text-sky-400 transition-colors">
                Termos de Uso
              </Link>
            </li>
          </ul>
        </div>

        {/* COLUNA 3 — SUPORTE */}
        <div className="text-center md:text-left">
          <h4 className="mb-2 font-semibold">Suporte</h4>

          {/* MOBILE → LINKS LADO A LADO */}
          <ul className="text-gray-400 flex justify-center gap-4 md:hidden">
            <li>
              <Link to="/central-de-ajuda" className="hover:text-sky-400 transition-colors">
                Central de Ajuda
              </Link>
            </li>
            <li>
              <Link to="/politicasprivacidade" className="hover:text-sky-400 transition-colors">
                Política de Privacidade
              </Link>
            </li>
          </ul>

          {/* DESKTOP → LISTA NORMAL */}
          <ul className="space-y-1 text-gray-400 hidden md:block">
            <li>
              <Link to="/central-de-ajuda" className="hover:text-sky-400 transition-colors">
                Central de Ajuda
              </Link>
            </li>
            <li>
              <Link to="/politicasprivacidade" className="hover:text-sky-400 transition-colors">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
}

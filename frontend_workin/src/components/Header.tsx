import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/workinicone.png";
import { Bell, Star, Menu, X,Settings,Briefcase,Users,ClipboardCheck,Home } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("empresaToken");
    localStorage.removeItem("empresa");
    localStorage.removeItem("empresaId");
    navigate("/");
  };

  const menuItems = [
    { to: "/dashboard", label: "Início", icon: <Home size={16} /> },
    { to: "/configuracoes", label: "Configurações", icon: <Settings size={16} /> },
    { to: "/criar-vaga", label: "Criar Vagas", icon: <Briefcase size={16} /> },
    { to: "/ver-candidatos", label: "Ver Candidatos", icon: <Users size={16} /> },
    { to: "/avaliacao", label: "Testes e Projetos", icon: <ClipboardCheck size={16} /> },
    { to: "/notificacoes", label: "Notificações", icon: <Bell size={16} /> },
    { to: "/premium", label: "Premium", icon: <Star size={16} />, color: "text-yellow-400" },
  ];

  return (
    <header className="bg-gradient-to-r from-emerald-950 via-sky-900 to-cyan-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 relative">
        {/* Ícone de menu (desktop + mobile) */}
        <button
          className="z-20 flex items-center justify-center text-white hover:text-emerald-300 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Logo centralizado */}
        <Link to="/dashboard" className="flex-1 flex justify-center md:justify-center z-10">
          <img
            src={logo}
            alt="Work-In"
            className="w-36 md:w-40 cursor-pointer hover:opacity-90 transition drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
          />
        </Link>
      </div>

      {/* Drawer lateral (menu principal) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-emerald-950 via-sky-900 to-cyan-700 text-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-emerald-700/40">
          <h2 className="text-lg font-semibold text-emerald-300">Menu</h2>
          <button onClick={() => setMenuOpen(false)} className="text-white hover:text-emerald-300">
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-3 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-800/40 transition ${item.color || ""}`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}

          {/* Botão sair dentro do menu */}
          <button
            onClick={handleLogout}
            className="mt-4 w-full px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-lg shadow hover:shadow-emerald-500/30 transition"
          >
            Sair
          </button>
        </nav>
      </div>

      {/* Overlay escurecido quando o menu está aberto */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerificarEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [status, setStatus] = useState("Esperando confirmação de e-mail...");

  useEffect(() => {
    if (!email) {
      setStatus("E-mail não informado. Retorne ao cadastro.");
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`https://projeto-startup.onrender.com/empresas/email/${email}`);
        const data = await res.json();

        if (data.emailVerified) {
          clearInterval(interval);
          setStatus("✅ E-mail verificado com sucesso! Redirecionando...");
          setTimeout(() => navigate("/dashboard"), 2000);
        }
      } catch {
        setStatus("Erro ao verificar status. Tentando novamente...");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [email, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Verificação de E-mail</h2>
        <p className="text-gray-600 mb-4">{status}</p>
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-500 mx-auto"></div>
      </div>
    </div>
  );
}

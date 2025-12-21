import { useEffect } from "react";

export default function PagamentoSucesso() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const empresaId = params.get("empresaId");
    const plano = params.get("plano");
    const token = localStorage.getItem("token");

    if (empresaId && plano) {
      fetch("http://localhost:3000/empresas/atualizar-plano", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ empresaId, novoPlano: plano }),
      }).then(() => {
        localStorage.setItem("plano", plano);
        window.location.href = "/dashboard";
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-green-600">
        Pagamento aprovado! Atualizando seu plano...
      </h1>
    </div>
  );
}

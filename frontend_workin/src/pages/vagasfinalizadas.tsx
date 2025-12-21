import { useEffect, useState } from "react";

export default function VagasFinalizadas() {
  const [vagasFinalizadas, setVagasFinalizadas] = useState<any[]>([]);

  useEffect(() => {
    const empresa = JSON.parse(localStorage.getItem("empresa") || "{}");
    const token = localStorage.getItem("empresaToken");

    if (!empresa.id || !token) return;

    fetch(`https://projeto-startup.onrender.com/vagas/finalizadas/${empresa.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setVagasFinalizadas(data.vagas || []);
      })
      .catch((err) => console.error("Erro ao carregar vagas finalizadas:", err));
  }, []);

  const reativarVaga = async (id: string) => {
    try {
      const token = localStorage.getItem("empresaToken");
      if (!token) return;

      await fetch(`https://projeto-startup.onrender.com/vagas/${id}/reativar`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVagasFinalizadas((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Erro ao reativar vaga:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-950 p-8 text-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-sky-400 border-b border-neutral-700 pb-3">
        Vagas Finalizadas
      </h2>

      {vagasFinalizadas.length === 0 ? (
        <p className="text-gray-400 text-center mt-20 text-lg">
          Nenhuma vaga finalizada ainda.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {vagasFinalizadas.map((vaga) => (
            <div
              key={vaga.id}
              className="group bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700 hover:border-sky-500/30 rounded-2xl shadow-lg p-6 transition-all duration-300 backdrop-blur-sm"
            >
              <h3 className="text-xl font-semibold text-white group-hover:text-sky-400 transition">
                {vaga.titulo}
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Área: <span className="text-gray-300">{vaga.areaProfissional}</span>
              </p>

              <p className="mt-3 text-gray-400 text-sm">
                Finalizada em:{" "}
                <span className="text-gray-200">
                  {new Date(vaga.finalizadaEm).toLocaleDateString()}
                </span>
              </p>

              <p className="mt-2 text-gray-400 text-sm">
                Candidato aceito:{" "}
                <span className="text-gray-200">
                  {vaga.candidatoAceito || "Não informado"}
                </span>
              </p>

              <div className="mt-5 flex justify-between items-center">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  Finalizada
                </span>

                <button
                  onClick={() => reativarVaga(vaga.id)}
                  className="px-4 py-2 text-sm rounded-lg font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition"
                >
                  Reativar vaga
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

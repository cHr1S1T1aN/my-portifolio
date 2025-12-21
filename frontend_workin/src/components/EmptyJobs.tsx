import { Link } from "react-router-dom";
import ini from "../assets/mascotebracocruzado.png";

export default function EmptyJobs() {
  return (
    <main className="flex flex-col items-center justify-start flex-1 pt-8 pb-32 text-center bg-white">
      <img src={ini} alt="Mascote" className="w-44 mb-6" />
      <h2 className="mb-3 text-3xl font-bold text-gray-800">
        Nenhuma vaga criada por aqui!
      </h2>
      <Link to="/criar-vaga" className="text-lg text-cyan-600 hover:underline">
        Crie sua vaga de emprego por aqui.
      </Link>
    </main>
  );
}
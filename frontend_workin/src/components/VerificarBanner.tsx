import { Link } from "react-router-dom";

export default function VerificarBanner() {
  return (
    <div className="py-10 text-center text-white bg-gradient-to-r from-sky-900 to-cyan-500 shadow-md">
      <div className="flex items-center justify-center space-x-2">
        <span className="text-3xl">✔️</span>
        <Link
          to="/verificar-conta"
          className="text-2xl font-semibold hover:underline hover:text-cyan-200 transition"
        >
          Verifique sua conta!
        </Link>
      </div>
    </div>
  );
}
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import IconeWorkin from "../assets/workinicone.png";
import toast, { Toaster } from "react-hot-toast";

export default function Cadastro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomeEmpresa: "",
    cnpj: "",
    emailCorporativo: "",
    telefoneContato: "",
    enderecoCompleto: "",
    nomeResponsavel: "",
    cargoResponsavel: "",
    senha: "",
    confirmarSenha: "",
    aceitarTermos: false,
  });

  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [cnpjVerified, setCnpjVerified] = useState<boolean | null>(null);
  const [carregando, setCarregando] = useState(false);

  // Função para gerar endereço aleatório
  const gerarEnderecoAleatorio = () => {
    const ruas = [
      "JOSIAS FERREIRA SOBRINHO", "AVENIDA PAULISTA", "RUA DAS FLORES", 
      "ALAMEDA SANTOS", "RUA OSCAR FREIRE", "AVENIDA BRASIL",
      "RUA 7 DE SETEMBRO", "AVENIDA GETÚLIO VARGAS", "RUA DA PAZ",
      "ALAMEDA DOS ANJOS", "RUA SÃO BENTO", "AVENIDA REPÚBLICA",
      "RUA DO COMÉRCIO", "AVENIDA INDUSTRIAL", "RUA DAS PALMEIRAS"
    ];
    
    const bairros = [
      "JARDIM MARACANA", "CENTRO", "VILA MADALENA", "BELA VISTA", "MOEMA",
      "JARDINS", "ITAIM BIBI", "BROOKLIN", "SANTO AMARO", "IPIRANGA",
      "JABAQUARA", "SANTO ANDRÉ", "SÃO BERNARDO", "OSASCO", "BARUERI"
    ];
    
    const cidadesEstados = [
      "UBERABA - MG", "SÃO PAULO - SP", "RIO DE JANEIRO - RJ", "BELO HORIZONTE - MG",
      "PORTO ALEGRE - RS", "BRASÍLIA - DF", "SALVADOR - BA", "FORTALEZA - CE",
      "CURITIBA - PR", "RECIFE - PE", "MANAUS - AM", "GOIÂNIA - GO",
      "CAMPINAS - SP", "SÃO JOSÉ DOS CAMPOS - SP", "SANTOS - SP"
    ];

    const ruaAleatoria = ruas[Math.floor(Math.random() * ruas.length)];
    const numero = Math.floor(Math.random() * 900) + 1;
    const bairroAleatorio = bairros[Math.floor(Math.random() * bairros.length)];
    const cidadeEstadoAleatorio = cidadesEstados[Math.floor(Math.random() * cidadesEstados.length)];

    return `${ruaAleatoria}, ${numero} - ${bairroAleatorio}, ${cidadeEstadoAleatorio}`;
  };

  // Função para validar CNPJ
  const validarCNPJ = (cnpj: string): boolean => {
    cnpj = cnpj.replace(/[^\d]/g, '');

    if (cnpj.length !== 14) return false;

    // Elimina CNPJs inválidos conhecidos
    if (/^(\d)\1+$/.test(cnpj)) return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) return false;

    return true;
  };

  // Função para formatar CNPJ
  const formatarCNPJ = (cnpj: string): string => {
    cnpj = cnpj.replace(/\D/g, '');
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
      return;
    }

    if (name === "cnpj") {
      value = value.replace(/\D/g, "");
      // Formata automaticamente enquanto digita
      if (value.length <= 14) {
        const formatted = formatarCNPJ(value);
        setFormData({ ...formData, [name]: formatted });
        
        // Valida automaticamente quando completo
        if (value.length === 14) {
          const isValid = validarCNPJ(value);
          setCnpjVerified(isValid);
          if (!isValid) {
            toast.error("CNPJ inválido!");
          }
        } else {
          setCnpjVerified(null);
        }
      }
      return;
    }

    if (name === "telefoneContato") value = value.replace(/\D/g, "");

    setFormData({ ...formData, [name]: value });
  };

  const handleVerificarCnpj = () => {
    const cnpjLimpo = formData.cnpj.replace(/\D/g, "");
    
    if (cnpjLimpo.length !== 14) {
      toast.error("CNPJ deve conter 14 dígitos!");
      setCnpjVerified(false);
      return;
    }

    const isValid = validarCNPJ(cnpjLimpo);
    setCnpjVerified(isValid);

    if (isValid) {
      // Gera endereço aleatório quando CNPJ é válido
      const enderecoAleatorio = gerarEnderecoAleatorio();
      setFormData(prev => ({
        ...prev,
        enderecoCompleto: enderecoAleatorio
      }));
      toast.success("✅ CNPJ válido! Endereço preenchido automaticamente.");
    } else {
      toast.error("❌ CNPJ inválido!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cnpjVerified !== true) {
      toast.error("Verifique o CNPJ antes de prosseguir!");
      return;
    }

    const senhaRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/;

    if (!senhaRegex.test(formData.senha)) {
      toast.error("A senha deve ter 12+ caracteres, com letra maiúscula, minúscula, número e símbolo.");
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      toast.error("As senhas não coincidem!");
      return;
    }

    if (!formData.aceitarTermos) {
      toast.error("Você precisa aceitar os Termos e a Política de Privacidade.");
      return;
    }

    setCarregando(true);

    try {
      const res = await fetch("https://projeto-startup.onrender.com/empresas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          cnpj: formData.cnpj.replace(/\D/g, "") // Envia apenas números
        }),
      });

      const data = await res.json();

      if (res.ok && data.empresa && data.token) {
        localStorage.setItem("empresaToken", data.token);
        localStorage.setItem("empresa", JSON.stringify(data.empresa));

        toast.success("Empresa cadastrada com sucesso!");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        toast.error(data.error || "Erro ao cadastrar empresa.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0a1724] via-[#0d2538] to-[#09203f] text-white relative overflow-hidden">
      <Toaster position="top-right" />

      {/* Lado esquerdo */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 text-center md:text-left">
        <img src={IconeWorkin} alt="Logo" className="w-40 md:w-56 mb-6 drop-shadow-lg" />
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Bem-vindo ao Work-In</h2>
        <p className="text-cyan-100 max-w-xs">
          Cadastre sua empresa e tenha acesso à nossa plataforma corporativa.
        </p>
      </div>

      {/* Lado direito - formulário */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-8">
        <div className="backdrop-blur-md bg-white/1 border border-white/10 shadow-2xl rounded-2xl p-6 md:p-10 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-4 text-cyan-400">
            Cadastro de Empresa
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="nomeEmpresa"
              placeholder="Nome da Empresa"
              value={formData.nomeEmpresa}
              onChange={handleChange}
              className="w-full p-3 bg-gray-950/40 border border-gray-800 text-gray-100 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              required
            />

            <div className="flex gap-2">
              <input
                type="text"
                name="cnpj"
                placeholder="CNPJ (00.000.000/0000-00)"
                value={formData.cnpj}
                onChange={handleChange}
                maxLength={18}
                className={`w-full p-3 bg-gray-950/40 border rounded-lg placeholder-gray-500 focus:ring-2 focus:outline-none ${
                  cnpjVerified === true 
                    ? 'border-green-500 text-green-100' 
                    : cnpjVerified === false 
                    ? 'border-red-500 text-red-100'
                    : 'border-gray-800 text-gray-100'
                }`}
              />
              <button
                type="button"
                onClick={handleVerificarCnpj}
                className="bg-cyan-600 hover:bg-cyan-700 px-4 rounded-lg transition font-semibold whitespace-nowrap"
              >
                Verificar
              </button>
            </div>

            {cnpjVerified !== null && (
              <p className={`text-sm ${cnpjVerified ? 'text-green-400' : 'text-red-400'}`}>
                {cnpjVerified ? '✅ CNPJ válido' : '❌ CNPJ inválido'}
              </p>
            )}

            <input
              type="email"
              name="emailCorporativo"
              placeholder="E-mail Corporativo"
              value={formData.emailCorporativo}
              onChange={handleChange}
              className="w-full p-3 bg-gray-950/40 border border-gray-800 text-gray-100 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              required
            />

            <input
              type="text"
              name="telefoneContato"
              placeholder="Telefone (Ex: 11987654321)"
              maxLength={11}
              value={formData.telefoneContato}
              onChange={handleChange}
              className="w-full p-3 bg-gray-950/40 border border-gray-800 text-gray-100 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />

            <input
              type="text"
              name="enderecoCompleto"
              placeholder="Endereço Completo"
              value={formData.enderecoCompleto}
              onChange={handleChange}
              className="w-full p-3 bg-gray-950/40 border border-gray-800 text-gray-100 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="nomeResponsavel"
                placeholder="Nome do Responsável"
                value={formData.nomeResponsavel}
                onChange={handleChange}
                className="w-full p-3 bg-gray-950/40 border border-gray-800 text-gray-100 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                required
              />
              <input
                type="text"
                name="cargoResponsavel"
                placeholder="Cargo (Ex: Diretor de RH)"
                value={formData.cargoResponsavel}
                onChange={handleChange}
                className="w-full p-3 bg-gray-950/40 border border-gray-800 text-gray-100 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>

            {/* Campos de senha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CAMPO SENHA COM TOOLTIP */}
              <div className="relative">
                <input
                  type={showSenha ? "text" : "password"}
                  name="senha"
                  placeholder="Senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className="peer w-full p-3 bg-gray-950/40 border border-gray-800 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowSenha(!showSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <div className="absolute left-0 -top-28 w-50 p-3 rounded-lg shadow-xl bg-gray-900 border border-gray-700 text-gray-200 text-sm opacity-0 scale-95 transition-all duration-200 pointer-events-none peer-focus-within:opacity-100 peer-hover:opacity-100 peer-focus-within:scale-100 peer-hover:scale-100 peer-[:not(:placeholder-shown)]:opacity-0">
                  <strong className="text-cyan-400">Regras da senha:</strong>
                  <ul className="mt-1 list-disc list-inside text-gray-300">
                    <li>12+ caracteres</li>
                    <li>Letra maiúscula</li>
                    <li>Letra minúscula</li>
                    <li>Número</li>
                    <li>Símbolo (!@#$%)</li>
                  </ul>
                  <div className="absolute left-5 -bottom-2 w-3 h-3 bg-gray-900 border-l border-b border-gray-700 rotate-45" />
                </div>
              </div>

              {/* CAMPO CONFIRMAR SENHA */}
              <div className="relative">
                <input
                  type={showConfirmarSenha ? "text" : "password"}
                  name="confirmarSenha"
                  placeholder="Confirmar Senha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-950/40 border border-gray-800 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="aceitarTermos"
                checked={formData.aceitarTermos}
                onChange={handleChange}
                className="mt-1 accent-cyan-600"
              />
              <span>
                Concordo com a{" "}
                <a href="/politicasprivacidade" className="text-cyan-400 underline">
                  Política de Privacidade
                </a>{" "}
                e os{" "}
                <a href="/termos" className="text-cyan-400 underline">
                  Termos de Uso
                </a>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-cyan-600 hover:bg-cyan-700 py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {carregando ? "Cadastrando..." : "Cadastrar Empresa"}
            </button>

            <p className="text-center text-sm text-gray-400 mt-4">
              <Link to="/" className="hover:text-cyan-400 hover:underline">
                ← Voltar para a Home
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
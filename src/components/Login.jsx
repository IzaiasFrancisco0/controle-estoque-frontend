import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const resposta = await axios.post('https://controle-estoque-backend-4.onrender.com/login', {
        usuario,
        senha,
      });

      localStorage.setItem('token', resposta.data.token); 

      setIsLoading(false);
      navigate('/');
    } catch (err) {
      console.error(err.response?.data.mensagem);
      setErro(err.response?.data.mensagem || 'Erro ao fazer login');
      setIsLoading(false);
    }
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <div className="w-full flex items-center justify-center h-screen bg-gray-100">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <ClipLoader color="#2563eb" size={50} />
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl mb-6 text-center text-gray-700 font-semibold">Login</h2>

          {erro && <div className="text-red-500 text-center mb-4">{erro}</div>}

          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          <div className="relative mb-6">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900 pr-10"
            />
            <button
              type="button"
              onClick={toggleMostrarSenha}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 focus:outline-none"
            >
              {mostrarSenha ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white p-3 rounded hover:bg-gray-700 transition"
            disabled={isLoading}
          >
            Entrar
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;

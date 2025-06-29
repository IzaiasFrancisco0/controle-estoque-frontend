import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export default function PasswordForm() {
    const [hasPassword, setHasPassword] = useState(false); 
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [loading, setLoading] = useState(true); 
    const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
    const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);

    useEffect(() => {
        const checkPassword = async () => {
            try {
                const response = await axios.get('http://localhost:5000/conta');
                setHasPassword(response.data.temSenha); 
            } catch (error) {
                console.error('Erro ao verificar senha:', error);
            } finally {
                setLoading(false); 
            }
        };

        checkPassword();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/conta', {
                senha: hasPassword ? currentPassword : newPassword, // Se já tiver senha, envia a senha antiga
                novaSenha: newPassword,
            });

            setMensagem(response.data.mensagem);
            setCurrentPassword('');
            setNewPassword('');
        } catch (error) {
            if (error.response?.data?.mensagem) {
                setMensagem(error.response.data.mensagem);
            } else {
                setMensagem('Erro ao conectar com o servidor.');
            }
        }
    };

    const toggleMostrarSenhaAtual = () => {
        setMostrarSenhaAtual(!mostrarSenhaAtual);
    };

    const toggleMostrarNovaSenha = () => {
        setMostrarNovaSenha(!mostrarNovaSenha);
    };

    if (loading) {
        return <div className="text-center">Carregando...</div>;
    }

    return (
        <div className="max-w-md mx-auto h-[35vh] mt-10 p-6 bg-gray-900 text-gray-100 rounded-xl shadow-md mt-20">
            <h2 className="text-2xl font-semibold text-center mb-6">
                {hasPassword ? 'Alterar Senha' : 'Cadastrar Senha'}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center">
                {hasPassword && (
                    <div className="relative">
                        <label htmlFor="current-password" className="block font-medium mb-1">
                            Senha atual
                        </label>
                        <input
                            type={mostrarSenhaAtual ? 'text' : 'password'}
                            id="current-password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={toggleMostrarSenhaAtual}
                            className="absolute inset-y-0 right-0 px-3 pt-6 text-gray-500 focus:outline-none h-full" // Alterado para flex-col justify-center
                        >
                            {mostrarSenhaAtual ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                        </button>
                    </div>
                )}

                <div className="relative">
                    <label htmlFor="new-password" className="block font-medium mb-1">
                        Nova senha
                    </label>
                    <input
                        type={mostrarNovaSenha ? 'text' : 'password'}
                        id="new-password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={toggleMostrarNovaSenha}
                        className="absolute inset-y-0 right-0 px-3 flex pt-6 justify-center items-center text-gray-500 focus:outline-none h-full" // Alterado para flex-col justify-center
                    >
                        {mostrarNovaSenha ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                    </button>
                </div>

                <button
                    type="submit"
                    className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                    {hasPassword ? 'Alterar senha' : 'Cadastrar senha'}
                </button>
            </form>

            {mensagem && (
                <div className="mt-4 text-center text-sm text-gray-800 bg-gray-100 p-2 rounded">
                    {mensagem}
                </div>
            )}

            {!hasPassword && (
                <p className="text-center text-gray-100 mt-4">
                    Já tem uma senha?{' '}
                    <span
                        onClick={() => setHasPassword(true)}
                        className="text-blue-600 cursor-pointer underline hover:text-blue-800"
                    >
                        Clique aqui para alterar
                    </span>
                </p>
            )}
        </div>
    );
}
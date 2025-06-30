import { useState, useEffect } from 'react';
import axios from 'axios';

const ProdutosVencidos = () => {
    const [produtos, setProdutos] = useState([]);
    const [vencidosOuQuase, setProdutosVencidosOuQuase] = useState([]);

    useEffect(() => {
        const buscarProdutos = async () => {
            try {
                const response = await axios.get('https://controle-estoque-backend-4.onrender.com/');

                const hoje = new Date();
                hoje.setHours(0, 0, 0, 0);

                const seteDiasDepois = new Date();
                seteDiasDepois.setDate(hoje.getDate() + 7);
                seteDiasDepois.setHours(23, 59, 59, 999);

                const filtrados = response.data.filter(produto => {
                    const validade = new Date(produto.dataValidade);
                    validade.setHours(0, 0, 0, 0);
                    return validade < hoje || (validade >= hoje && validade <= seteDiasDepois);
                });

                setProdutos(response.data);
                setProdutosVencidosOuQuase(filtrados);
            } catch (err) {
                console.error('Erro ao buscar produtos:', err);
            }
        };

        buscarProdutos();
    }, []);

    const formatarData = (data) => {
        const d = new Date(data);
        return d.toLocaleDateString('pt-BR');
    };

    return (
        <div className="w-[85%] min-h-screen bg-gray-50 p-6">
            <h2 className="text-3xl text-gray-800 font-semibold mb-6">Produtos Vencidos ou Próximos do Vencimento</h2>
            <div className="grid grid-cols-4 gap-4">
                {vencidosOuQuase.length === 0 ? (
                    <p className="text-gray-500 col-span-4 text-center">Nenhum produto vencido ou próximo do vencimento.</p>
                ) : (
                    vencidosOuQuase.map((produto, index) => {
                        const validade = new Date(produto.dataValidade);
                        const hoje = new Date();
                        const status = validade < hoje ? 'VENCIDO' : 'PRÓXIMO DO VENCIMENTO';
                        const statusColor = validade < hoje ? 'text-red-600' : 'text-yellow-600';

                        return (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition">
                                <img className="mx-auto mb-3 rounded" src={produto.imagem} alt={produto.nome} width="120" />
                                <h3 className="font-medium text-gray-800 text-lg">{produto.nome}</h3>
                                <p className={`font-semibold ${statusColor}`}>Status: {status}</p>
                                <p className="text-sm text-gray-600">Validade: {formatarData(produto.dataValidade)}</p>
                                <p className="text-sm text-gray-700 font-medium">Fabricado: {formatarData(produto.dataFabricado)}</p>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ProdutosVencidos;

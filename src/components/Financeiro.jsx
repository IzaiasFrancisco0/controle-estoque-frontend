import { useState, useEffect } from 'react';
import axios from 'axios';

const Financeiro = () => {
    const [valorTotal, setValorTotal] = useState(0);
    const [totaisPorCategoria, setTotaisPorCategoria] = useState({});
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

    useEffect(() => {
        const buscarProdutos = async () => {
            try {
                const response = await axios.get('https://controle-estoque-backend-4.onrender.com/');
                const produtos = response.data;

                let totalGeral = 0;
                const totaisCategoria = {};

                produtos.forEach((prod) => {
                    const preco = parseFloat(prod.preco) || 0;
                    const quantidade = parseInt(prod.quantidade) || 0;
                    const subtotal = preco * quantidade;
                    const categoria = prod.categoria || 'Outros';

                    totalGeral += subtotal;

                    if (!totaisCategoria[categoria]) {
                        totaisCategoria[categoria] = 0;
                    }

                    totaisCategoria[categoria] += subtotal;
                });

                setValorTotal(totalGeral);
                setTotaisPorCategoria(totaisCategoria);
            } catch (err) {
                console.error("Erro ao buscar produtos:", err);
            }
        };

        buscarProdutos();
    }, []);

    return (
        <div className="p-6 w-[85%] flex flex-col justify-center items-center">
            <h2 className="text-3xl font-semibold mb-4">Financeiro</h2>

            <div className="mb-6 flex">
                <label className="block mb-2 text-lg font-medium pr-4 pt-2">Selecionar Categoria</label>
                <select
                    className="p-2 border rounded-md"
                    value={categoriaSelecionada}
                    onChange={(e) => setCategoriaSelecionada(e.target.value)}
                >
                    <option value="">Escolha uma categoria</option>
                    {Object.keys(totaisPorCategoria).map((categoria) => (
                        <option key={categoria} value={categoria}>
                            {categoria}
                        </option>
                    ))}
                </select>
            </div>
            {categoriaSelecionada && (
                <div className="w-[80%] h-[300px] mb-6 p-6 bg-blue-100 text-center rounded-lg shadow-md">
                    <h3 className="text-6xl font-semibold mb-2">Total em {categoriaSelecionada}:</h3>
                    <div className="text-8xl text-blue-800 font-bold mt-10">
                        R$ {totaisPorCategoria[categoriaSelecionada].toFixed(2)}
                    </div>
                </div>
            )}

            <div className="w-[80%] h-[300px] mb-6 p-6 bg-green-100 text-center rounded-lg shadow-md">
                <h3 className="text-6xl font-semibold mb-10">Valor total em estoque:{' '}</h3>
                <span className="text-8xl text-green-800 font-bold">R$ {valorTotal.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default Financeiro;

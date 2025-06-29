import axios from 'axios';
import { useState, useEffect } from 'react';

const ProdutosCadastrados = () => {
    const [produtos, setProdutos] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('Alimentos');
    const [inputPesquisa, setInputPesquisa] = useState('');
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);

    useEffect(() => {
        const consumir = async () => {
            try {
                const response = await axios.get('http://localhost:5000/')
                setProdutos(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };
        consumir();
    }, []);

    const categorias = ['Alimentos', 'Frios', 'Bebidas', 'Doces', 'Higiene', 'Limpeza', 'Ultilidades'];

    const formatarData = (data) => {
        const d = new Date(data);
        return d.toLocaleDateString('pt-BR');
    }

    const renderProdutos = () => {
        const lista = inputPesquisa ? produtosFiltrados : produtos.filter(p => p.categoria === categoriaSelecionada);

        if (lista.length === 0) {
            return <p className="col-span-5 text-gray-500 text-center">Nenhum produto encontrado.</p>;
        }

        return lista.map((produto, index) => (
            <div key={index} className="bg-white p-4 m-2 rounded-lg shadow-sm text-center hover:shadow-md transition">
                <img className="ml-[20%] mb-3 rounded" src={produto.imagem} alt={produto.nome} width="150" />
                <h3 className="font-semibold text-gray-800 text-lg border-b-2 border-gray-300">{produto.nome}</h3>
                <p className="text-green-600 font-medium mt-1">Preço: R$ {produto.preco}</p>
                <p className="text-sm text-gray-600 pt-2">Quantidade: {produto.quantidade}</p>
                <p className="text-sm text-gray-600 pt-2">Fabricado: {formatarData(produto.dataFabricado)}</p>
                <p className="text-sm text-gray-600 pt-2">Validade: {formatarData(produto.dataValidade)}</p>

            </div>
        ));
    };

    const pesquisarProduto = (valorDigitado) => {
        setInputPesquisa(valorDigitado);
        const texto = valorDigitado.toLowerCase();

        const filtrados = produtos.filter(
            produto =>
                produto.categoria === categoriaSelecionada &&
                produto.nome.toLowerCase().includes(texto)
        );
        setProdutosFiltrados(filtrados);
    };

    return (
        <div className="w-[85%] h-screen bg-gray-50">
            <div className="w-full h-[7vh] border-b border-gray-300 bg-gray-900 flex justify-around items-center px-4">
                <input
                    className="p-2 rounded-md border border-gray-300 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    placeholder="Pesquise um produto"
                    onChange={(e) => pesquisarProduto(e.target.value)}
                />
                <select
                    className="p-2 rounded-md border border-gray-300 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={categoriaSelecionada}
                    onChange={(e) => {
                        const novaCategoria = e.target.value;
                        setCategoriaSelecionada(novaCategoria);
                        setInputPesquisa('');
                        setProdutosFiltrados([]);
                    }}
                >
                    {categorias.map((categoria, index) => (
                        <option key={index} value={categoria}>
                            {categoria}
                        </option>
                    ))}
                </select>
            </div>

            <div className="p-4 overflow-y-auto" style={{ height: '93vh' }}>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">
                    {inputPesquisa
                        ? `Busca por: "${inputPesquisa}" em ${categoriaSelecionada}`
                        : `Produtos da categoria: ${categoriaSelecionada}`}
                </h3>
                <div className="grid grid-cols-5 gap-4">
                    {renderProdutos()}
                </div>
            </div>
        </div>
    );
};

export default ProdutosCadastrados;

import { useState } from 'react';
import axios from 'axios';

const CadastrarProduto = () => {
  const [inputNome, setInputNome] = useState('');
  const [inputPreco, setInputPreco] = useState('');
  const [inputFabricado, setInputFabricado] = useState('');
  const [inputValidade, setInputValidade] = useState('');
  const [inputImagem, setInputImagem] = useState('');
  const [inputCategoria, setInputCategoria] = useState('');
  const [inputQuantidade, setInputQuantidade] = useState('');
  const [produtoCadastrado, setProdutoCadastrado] = useState(false);
  const [erros, setErros] = useState({});

  const validarCampos = async () => {
    const novosErros = {};

    if (!inputNome) novosErros.nome = true;
    if (!inputPreco || isNaN(parseFloat(inputPreco))) novosErros.preco = true;
    if (!inputFabricado) novosErros.fabricado = true;
    if (!inputValidade) novosErros.validade = true;
    if (!inputImagem) novosErros.imagem = true;
    if (!inputCategoria) novosErros.categoria = true;
    if (!inputQuantidade || isNaN(parseInt(inputQuantidade))) novosErros.quantidade = true;

    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    const precoConvertido = parseFloat(inputPreco);
    const dataFabricadoISO = new Date(inputFabricado).toISOString();
    const dataValidadeISO = new Date(inputValidade).toISOString();
    const quantidadeConvertida = parseInt(inputQuantidade);

    const novoProduto = {
      nome: inputNome,
      preco: precoConvertido,
      dataFabricado: dataFabricadoISO,
      dataValidade: dataValidadeISO,
      imagem: inputImagem,
      categoria: inputCategoria,
      quantidade: quantidadeConvertida, 
    };

    console.log("Enviando para API:", novoProduto);

    try {
      const response = await axios.post('http://localhost:5000/cadastrar', novoProduto, { withCredentials: true });
      console.log("Produto cadastrado!!", response.data);

      setProdutoCadastrado(true);

      setInputNome('');
      setInputPreco('');
      setInputFabricado('');
      setInputValidade('');
      setInputImagem('');
      setInputCategoria('');
      setInputQuantidade('');
      setErros({});
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      alert('Erro ao cadastrar produto');
    }
  };

  const inputBase = "w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="w-[85%] min-h-screen bg-gray-50 flex flex-col items-center">
      <h2 className="text-3xl font-semibold text-gray-800 pt-10 mb-10">Cadastrar Produto</h2>

      <form className="grid grid-cols-2 gap-6 w-full max-w-2xl p-8 bg-gray-900 shadow-md rounded-xl">
        <div className="col-span-1">
          <input
            className={`${inputBase} ${erros.nome ? 'border-red-500' : 'border-gray-300'}`}
            type="text"
            value={inputNome}
            placeholder="Nome"
            onChange={(e) => setInputNome(e.target.value)}
          />
        </div>

        <div className="col-span-1">
          <input
            className={`${inputBase} ${erros.preco ? 'border-red-500' : 'border-gray-300'}`}
            type="text"
            value={inputPreco}
            placeholder="Preço"
            onChange={(e) => setInputPreco(e.target.value)}
          />
        </div>

        <div className="col-span-1">
          <label className="block mb-1 text-gray-100">Data de Fabricação</label>
          <input
            className={`${inputBase} ${erros.fabricado ? 'border-red-500' : 'border-gray-300'}`}
            type="date"
            value={inputFabricado}
            onChange={(e) => setInputFabricado(e.target.value)}
          />
        </div>

        <div className="col-span-1">
          <label className="block mb-1 text-gray-100">Data de Validade</label>
          <input
            className={`${inputBase} ${erros.validade ? 'border-red-500' : 'border-gray-300'}`}
            type="date"
            value={inputValidade}
            onChange={(e) => setInputValidade(e.target.value)}
          />
        </div>

        <div className="col-span-1">
          <input
            className={`${inputBase} ${erros.imagem ? 'border-red-500' : 'border-gray-300'}`}
            type="text"
            value={inputImagem}
            placeholder="Link da Imagem"
            onChange={(e) => setInputImagem(e.target.value)}
          />
        </div>

        <div className="col-span-1">
          <select
            className={`${inputBase} bg-white ${erros.categoria ? 'border-red-500' : 'border-gray-300'}`}
            defaultValue=""
            onChange={(e) => setInputCategoria(e.target.value)}
          >
            <option value="" disabled>Selecione uma categoria</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Frios">Frios</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Doces">Doces</option>
            <option value="Higiene">Higiene</option>
            <option value="Limpeza">Limpeza</option>
            <option value="Ultilidades">Ultilidades</option>
          </select>
        </div>

        <div className="col-span-1">
          <input
            type="number"
            placeholder="Quantidade"
            className={`${inputBase} ${erros.quantidade ? 'border-red-500' : 'border-gray-300'}`}
            value={inputQuantidade || ''}
            onChange={(e) => setInputQuantidade(e.target.value)}
          />
        </div>

        <div className="col-span-2 flex justify-center">
          <button
            className="w-1/2 p-3 bg-gray-100 text-black font-semibold rounded-md hover:bg-gray-300 transition-all duration-200 text-lg"
            type="button"
            onClick={validarCampos}
          >
            Cadastrar
          </button>
        </div>

        {produtoCadastrado && (
          <p className="col-span-2 text-green-600 text-center mt-4">
            Produto cadastrado com sucesso!!
          </p>
        )}
      </form>
    </div>
  );
};

export default CadastrarProduto;

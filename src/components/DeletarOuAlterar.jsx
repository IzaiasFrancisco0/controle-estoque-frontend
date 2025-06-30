import { useState, useEffect } from 'react';
import axios from 'axios';
import { produtoSchema } from '../schemas.js';

const DeletarOuAlterar = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [editando, setEditando] = useState({});
  const [senhaCadastrada, setSenhaCadastrada] = useState('');

  useEffect(() => {
    buscarProdutos();
    buscarSenha();
  }, []);

  const buscarProdutos = async () => {
    try {
      const response = await axios.get('https://controle-estoque-backend-4.onrender.com/', {
        withCredentials: true,
      });
      const semImagem = response.data.map(({ imagem, ...resto }) => resto);
      setProdutos(semImagem);
      setProdutosFiltrados(semImagem);
    } catch (err) {
      console.error("Erro ao buscar os dados da API", err);
    }
  };

  const buscarSenha = async () => {
    try {
      const response = await axios.get('https://controle-estoque-backend-4.onrender.com/conta');
      setSenhaCadastrada(response.data.senha);
    } catch (err) {
      console.error("Erro ao buscar a senha", err);
    }
  };

  const handleFiltroCategoria = (categoria) => {
    setCategoriaSelecionada(categoria);
    if (categoria === '') {
      setProdutosFiltrados(produtos);
    } else {
      const filtrados = produtos.filter(prod => prod.categoria === categoria);
      setProdutosFiltrados(filtrados);
    }
  };

  const deletarProduto = async (id) => {
    const senhaPraDeletar = prompt("Digite a senha para deletar o produto:");

    if (senhaPraDeletar !== senhaCadastrada) {
      alert("Senha incorreta. Ação cancelada.");
      return;
    }

    try {
      await axios.delete(`https://controle-estoque-backend-4.onrender.com/produto/${id}`);
      const novosProdutos = produtos.filter(prod => prod._id !== id);
      setProdutos(novosProdutos);
      handleFiltroCategoria(categoriaSelecionada);
    } catch (err) {
      console.error("Erro ao deletar produto", err);
    }
  };

  const atualizarProduto = async (id, campo, valor) => {
    const senhaPraAlterar = prompt("Digite a senha para alterar o produto:");

    if (senhaPraAlterar !== senhaCadastrada) {
      alert("Senha incorreta. Ação cancelada.");
      return;
    }

    try {
      let novoValor = valor;

      if (campo === "preco") {
        novoValor = Number(valor.toString().replace(",", "."));
        if (isNaN(novoValor)) {
          alert("Preço inválido");
          return;
        }
      } else if (campo === "quantidade") {
        novoValor = parseInt(valor);
        if (isNaN(novoValor)) {
          alert("Quantidade inválida");
          return;
        }
      } else if (campo === "dataFabricado" || campo === "dataValidade") {
        const dataISO = new Date(valor).toISOString();
        if (isNaN(new Date(dataISO).getTime())) {
          alert("Data inválida");
          return;
        }
        novoValor = dataISO;
      }

      const campoSchema = produtoSchema.pick({ [campo]: true });
      const resultadoValidacao = campoSchema.safeParse({ [campo]: novoValor });

      if (!resultadoValidacao.success) {
        alert(resultadoValidacao.error.errors[0].message);
        return;
      }

      console.log("Enviando PUT:", id, campo, novoValor);

      await axios.put(`https://controle-estoque-backend-4.onrender.com/produto/${id}`, { [campo]: novoValor }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });

      const atualizados = produtos.map(prod =>
        prod._id === id ? { ...prod, [campo]: novoValor } : prod
      );
      setProdutos(atualizados);
      handleFiltroCategoria(categoriaSelecionada);

    } catch (err) {
      console.error("Erro ao atualizar produto:", err.response?.data || err.message);
    }
  };

  const handleCampoClick = (id, campo) => {
    setEditando({ id, campo });
  };

  const handleCampoChange = (id, campo, valor) => {
    atualizarProduto(id, campo, valor);
    setEditando({});
  };

  const renderCampo = (produto, campo) => {
    const valor = produto[campo];
    if (editando.id === produto._id && editando.campo === campo) {
      return (
        <input
          type={campo.includes("data") ? "date" : "text"}
          defaultValue={campo.includes("data") ? new Date(valor).toISOString().split("T")[0] : valor}
          autoFocus
          onBlur={(e) => handleCampoChange(produto._id, campo, e.target.value)}
          className="border p-1 w-full"
        />
      );
    } else {
      return (
        <span
          onClick={() => handleCampoClick(produto._id, campo)}
          className="cursor-pointer"
        >
          {campo.includes('data') ? new Date(valor).toLocaleDateString('pt-BR') : valor}
        </span>
      );
    }
  };

  return (
    <div className="p-6 w-[85%]">
      <div className="flex justify-between items-center mb-6 px-10">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <select
          onChange={(e) => handleFiltroCategoria(e.target.value)}
          value={categoriaSelecionada}
          className="border p-2 rounded"
        >
          <option value="">Todas as categorias</option>
          <option value="Alimentos">Alimentos</option>
          <option value="Frios">Frios</option>
          <option value="Doces">Doces</option>
          <option value="Bebidas">Bebidas</option>
          <option value="Limpeza">Limpeza</option>
          <option value="Higiene">Higiene</option>
          <option value="Ultilidades">Ultilidades</option>
        </select>
      </div>
      <div className="w-[80%] mx-auto max-h-[85vh] overflow-y-auto border border-gray-300 rounded">
        <table className="w-full border-collapse">
          <thead className="bg-gray-900 text-gray-100 text-xl sticky top-0 z-10">
            <tr>
              <th className="border border-gray-300 p-2">Nome</th>
              <th className="border border-gray-300 p-2">Categoria</th>
              <th className="border border-gray-300 p-2">Preço</th>
              <th className="border border-gray-300 p-2">Data de Fabricação</th>
              <th className="border border-gray-300 p-2">Data de Validade</th>
              <th className="border border-gray-300 p-2">Quantidade</th>
              <th className="border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {produtosFiltrados.map((produto) => (
              <tr key={produto._id} className="text-center">
                <td className="border border-gray-300 p-2">{renderCampo(produto, 'nome')}</td>
                <td className="border border-gray-300 p-2">{renderCampo(produto, 'categoria')}</td>
                <td className="border border-gray-300 p-2">R$ {renderCampo(produto, 'preco')}</td>
                <td className="border border-gray-300 p-2">{renderCampo(produto, 'dataFabricado')}</td>
                <td className="border border-gray-300 p-2">{renderCampo(produto, 'dataValidade')}</td>
                <td className="border border-gray-300 p-2">{renderCampo(produto, 'quantidade')} un</td>
                <td className="border border-gray-300 p-2 flex justify-center gap-2">
                  <button
                    className="p-2 bg-orange-600 text-white rounded"
                    onClick={() => alert('Clique em um campo para alterar')}
                  >
                    Alterar
                  </button>
                  <button
                    className="p-2 bg-red-600 text-white rounded"
                    onClick={() => deletarProduto(produto._id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeletarOuAlterar;

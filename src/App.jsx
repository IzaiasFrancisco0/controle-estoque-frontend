import { useLocation } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import SideBar from './components/SideBar.jsx'
import ProdutosCadastrados from './components/ProdutosCadastrados.jsx'
import CadastrarProduto from './components/CadastrarProduto.jsx'
import ProdutosVencidos from './components/ProdutosVencidos.jsx'
import DeletarOuAlterar from './components/DeletarOuAlterar.jsx'
import Financeiro from './components/Financeiro.jsx'
import Conta from './components/Conta.jsx'
import Login from './components/Login.jsx'
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  return (
    <div className="w-full h-screen flex">
      {!isLoginPage && <SideBar />}
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateRoute><CadastrarProduto /></PrivateRoute>} />
        <Route path="/cadastrados" element={<PrivateRoute><ProdutosCadastrados /></PrivateRoute>} />
        <Route path="/vencidos" element={<PrivateRoute><ProdutosVencidos /></PrivateRoute>} />
        <Route path="/deletar" element={<PrivateRoute><DeletarOuAlterar /></PrivateRoute>} />
        <Route path="/financeiro" element={<PrivateRoute><Financeiro /></PrivateRoute>} />
        <Route path="/conta" element={<PrivateRoute><Conta /></PrivateRoute>} />

        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App

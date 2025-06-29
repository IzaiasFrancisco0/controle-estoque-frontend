import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { TbCashRegister } from "react-icons/tb";
import { MdOutlineAutoDelete } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-full md:w-[15%] h-auto md:h-screen bg-gray-900 flex flex-col items-center pt-4 md:pt-10 fixed md:relative bottom-0 md:bottom-auto left-0 md:left-auto z-50 md:z-auto">
      
      {/* Título sempre visível no topo */}
      <h3 className="text-2xl font-bold pb-2 border-b-2 text-gray-100 border-black w-full px-4 mb-4 text-center md:text-left">
        Controle de Estoque
      </h3>

      <ul className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 w-full px-2 md:px-4 justify-center md:justify-start">
        <li>
          <Link
            to="/"
            className="flex items-center text-gray-100 text-base md:text-lg font-medium hover:bg-gray-300 hover:text-black p-2 rounded transition font-semibold"
          >
            <span className="text-xl md:text-2xl mr-2 md:mr-3"><MdOutlineProductionQuantityLimits /></span>
            <span className="hidden md:inline">Cadastrar um Produto</span>
          </Link>
        </li>

        <li>
          <Link
            to="/cadastrados"
            className="flex items-center text-gray-100 text-base md:text-lg font-medium hover:bg-gray-300 hover:text-black p-2 rounded transition font-semibold"
          >
            <span className="text-xl md:text-2xl mr-2 md:mr-3"><AiOutlineProduct /></span>
            <span className="hidden md:inline">Produtos Cadastrados</span>
          </Link>
        </li>

        <li>
          <Link
            to="/vencidos"
            className="flex items-center text-gray-100 text-base md:text-lg font-medium hover:bg-gray-300 hover:text-black p-2 rounded transition font-semibold"
          >
            <span className="text-xl md:text-2xl mr-2 md:mr-3"><TbCashRegister /></span>
            <span className="hidden md:inline">Produtos Vencidos</span>
          </Link>
        </li>

        <li>
          <Link
            to="/deletar"
            className="flex items-center text-gray-100 text-base md:text-lg font-medium hover:bg-gray-300 hover:text-black p-2 rounded transition font-semibold"
          >
            <span className="text-xl md:text-2xl mr-2 md:mr-3"><MdOutlineAutoDelete /></span>
            <span className="hidden md:inline">Deletar ou Alterar</span>
          </Link>
        </li>

        <li>
          <Link
            to="/financeiro"
            className="flex items-center text-gray-100 text-base md:text-lg font-medium hover:bg-gray-300 hover:text-black p-2 rounded transition font-semibold"
          >
            <span className="text-xl md:text-2xl mr-2 md:mr-3"><MdAttachMoney /></span>
            <span className="hidden md:inline">Financeiro</span>
          </Link>
        </li>

        <li>
          <Link
            to="/conta"
            className="flex items-center text-gray-100 text-base md:text-lg font-medium hover:bg-gray-300 hover:text-black p-2 rounded transition font-semibold"
          >
            <span className="text-xl md:text-2xl mr-2 md:mr-3"><MdOutlineAccountCircle /></span>
            <span className="hidden md:inline">Conta</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;

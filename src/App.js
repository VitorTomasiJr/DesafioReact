import React, { useState } from 'react';
import ProdutoForm from './telas/ProdutoForm';
import TipoProdForm from './telas/TipoProdForm';
import VendaForm from './telas/VendaForm';
import VendasLista from './telas/VendasLista';

function App() {
  const [tela, setTela] = useState('inicio');

  const renderForm = () => {
    switch (tela) {
      case 'produto':
        return <ProdutoForm />;
      case 'tipoProduto':
        return <TipoProdForm />;
      case 'venda':
        return <VendaForm />;
      case 'vendaLista':
        return <VendasLista />;
      case 'inicio':
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Desafio PHP</h1>
      <nav>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <button
              className={`nav-link ${tela === 'inicio' ? 'active' : ''}`}
              onClick={() => setTela('inicio')}
            >
              Início
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${tela === 'produto' ? 'active' : ''}`}
              onClick={() => setTela('produto')}
            >
              Produto
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${tela === 'tipoProduto' ? 'active' : ''}`}
              onClick={() => setTela('tipoProduto')}
            >
              Tipo de Produto
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${tela === 'venda' ? 'active' : ''}`}
              onClick={() => setTela('venda')}
            >
              Venda
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${tela === 'vendaLista' ? 'active' : ''}`}
              onClick={() => setTela('vendaLista')}
            >
              Lista de Vendas
            </button>
          </li>
        </ul>
      </nav>
      {renderForm()}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { baseURL } from '../config';
import axios from 'axios';
import VendaDetalhe from './VendaDetalhe';
import ButtonDetalhar from '../componentes/ButtonDetalhar';

const VendasLista = () => {
  const [vendas, setVendas] = useState([]);
  const [vendaId, setVendaId] = useState(null);

  useEffect(() => {
    axios.get(baseURL + '/src/vendas.php')
      .then(response => {
        setVendas(response.data);
        console.log(response.data);
      }).catch(error => console.log(error));
  }, []);

  const detalhar = (id) => {
    setVendaId(id);
  };

  const backClick = () => {
    setVendaId(null);
  };

  return (
    <div className="mt-5">
      {vendaId ? (
        <VendaDetalhe vendaId={vendaId} onBack={backClick} />
      ) : (
        <>
          <h2>Lista de Vendas</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Total da Venda</th>
                <th>Total de Impostos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {vendas.map((venda, index) => (
                <tr key={index}>
                  <td>{venda.id}</td>
                  <td>R${parseFloat(venda.total_venda).toFixed(2)}</td>
                  <td>R${parseFloat(venda.total_imposto).toFixed(2)}</td>
                  <td>
                    <ButtonDetalhar onClick={() => detalhar(venda.id)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default VendasLista;

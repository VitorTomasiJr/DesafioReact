import React, { useState, useEffect } from 'react';
import { baseURL } from '../config';
import axios from 'axios';
import ButtonVoltar from '../componentes/ButtonVoltar';

const VendaDetalhe = ({ vendaId, onBack }) => {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    axios.get(baseURL + `/src/vendas_detalhe.php?id=${vendaId}`)
      .then(resp => {
        setItens(resp.data);
        console.log(resp.data);
      })
      .catch(error => {
        console.error("There was an error fetching the sale details!", error);
      });
  }, [vendaId]);

  return (
    <div>
      <ButtonVoltar onClick={onBack} />
      <h2>Detalhes da Venda #{vendaId}</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Percentual de Imposto</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item, index) => (
            <tr key={index}>
              <td>{item.descricao}</td>
              <td>{item.quantidade}</td>
              <td>R${parseFloat(item.preco_unitario).toFixed(2)}</td>
              <td>{item.perc_imposto}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendaDetalhe;

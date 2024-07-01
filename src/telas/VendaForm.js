import React, { useState, useEffect } from 'react';
import { baseURL } from '../config';
import axios from 'axios';
import ButtonNovo from '../componentes/ButtonNovo';
import ButtonSalvar from '../componentes/ButtonSalvar';
import InputNumber from '../componentes/InputNumber';

const VendaForm = () => {
  const [produto, setProduto] = useState([]);
  const [itens, setItens] = useState([]);
  const [total, setTotal] = useState(0);
  const [impTotal, setImpTotal] = useState(0);

  useEffect(() => {
    axios.get(baseURL + '/src/produtos.php')
      .then(response => {
        setProduto(response.data);
        console.log(response);
      });
  }, []);

  const addItem = () => {
    setItens([...itens, { produto_id: '', quantidade: 1 }]);
  };

  const produtoChange = (index, value) => {
    const newItens = [...itens];
    newItens[index].produto_id = value;
    setItens(newItens);
  };

  const qtdeChange = (index, value) => {
    const newItens = [...itens];
    newItens[index].quantidade = value;
    setItens(newItens);
  };

  const funcSubmit = (e) => {
    e.preventDefault();

    axios.post(baseURL + '/src/vendas.php', { itens })
      .then(data => {
        console.log(data.message);
        setItens([]);
        setTotal(0);
        setImpTotal(0);
      }).catch(error => console.log(error));
  };

  useEffect(() => {
    var newTotal = 0;
    var newImpTotal = 0;

    itens.forEach(item => {
      var prod = produto.find(p => p.id == item.produto_id);
      if (prod) {
        var prodTotal = prod.preco * item.quantidade;
        var impTotal = prodTotal * (prod.perc_imposto / 100);
        newTotal += prodTotal;
        newImpTotal += impTotal;
      }
    });

    setTotal(newTotal);
    setImpTotal(newImpTotal);
  }, [itens, produto]);

  return (
    <div className="mt-5">
      <h2>Registrar Venda</h2>
      <form onSubmit={funcSubmit}>
        {itens.map((item, index) => (
          <div key={index} className="form-group row">
            <div className="col">
              <select className="form-control" value={item.produto_id} onChange={(e) => produtoChange(index, e.target.value)} required>
                <option value="">Selecione o Produto</option>
                {produto.map((prod) => (
                  <option key={prod.id} value={prod.id}>{prod.descricao}</option>
                ))}
              </select>
            </div>
            <div className="col">
              <InputNumber value={item.quantidade} onChange={(e) => qtdeChange(index, e.target.value)} required={true} step={"1"} />
            </div>
          </div>
        ))}
        <ButtonNovo desc={'Adicionar Produto'} onClick={addItem} />
        <ButtonSalvar desc={'Registrar Venda'} />
      </form>
      <div className="mt-3">
        <h4>Total da Venda: R${total.toFixed(2)}</h4>
        <h4>Total de Impostos: R${impTotal.toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default VendaForm;

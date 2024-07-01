import React, { useState, useEffect } from 'react';
import { baseURL } from '../config';
import axios from 'axios';
import ButtonNovo from '../componentes/ButtonNovo';
import ButtonSalvar from '../componentes/ButtonSalvar';
import ButtonEditar from '../componentes/ButtonEditar';
import ButtonInativar from '../componentes/ButtonInativar';
import InputNumber from '../componentes/InputNumber';
import InputText from '../componentes/InputText';

const ProdutoForm = () => {
  const [descricao, setDescricao] = useState('');
  const [tipoId, setTipoId] = useState('');
  const [preco, setPreco] = useState('');
  const [tipos, setTipos] = useState([]);
  const [editar, setEditar] = useState(null);
  const [inativar, setInativar] = useState(null);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregaProdutos();
    carregaTipos();
  }, []);

  useEffect(() => {
    if (inativar) {
      requisicao();
    }
  }, [inativar]);

  const carregaProdutos = () => {
    axios.get(baseURL + '/src/produtos.php')
      .then(response => {
        setProdutos(response.data);
      });
  };

  const carregaTipos = () => {
    axios.get(baseURL + '/src/tipos_produto.php')
      .then(response => {
        setTipos(response.data);
      }).catch(error => console.log(error));
  };

  const funcSubmit = (e) => {
    e.preventDefault();

    requisicao();
  };

  const requisicao = () => {
    if (editar) {
      axios.post(baseURL + '/src/produtos.php', { acao: 'editar', id: editar, descricao, produto_tipo_id: tipoId, preco })
        .then(response => {
          console.log(response.data.message);
          resetForm();
          carregaProdutos();
        }).catch(error => console.log(error));
    } else if (inativar) {
      axios.post(baseURL + '/src/produtos.php', { acao: 'inativar', id: inativar })
        .then(response => {
          console.log(response.data.message);
          resetForm();
          carregaProdutos();
        }).catch(error => console.log(error));
    } else {
      axios.post(baseURL + '/src/produtos.php', { acao: 'novo', descricao, produto_tipo_id: tipoId, preco })
        .then(data => {
          console.log(data.message);
          resetForm();
          carregaProdutos();
        }).catch(error => console.log(error));
    }
  }

  const funcEditar = (id, desc, tipo_id, prec) => {
    setInativar(null);
    setEditar(id);
    setDescricao(desc);
    setTipoId(tipo_id);
    setPreco(prec);
  };

  const funcInativar = (id) => {
    const confirma = window.confirm('Tem certeza que deseja inativar este produto?');
    if (confirma) {
      setEditar(null);
      setInativar(id);
    }
  };

  const resetForm = () => {
    setDescricao('');
    setPreco('');
    setTipoId('');
    setEditar(null);
    setInativar(null);
    //setProdutos(null);
  };

  return (
    <div className="mt-5">
      <h2>Cadastrar Produto</h2>
      <form onSubmit={funcSubmit}>
        <div className="form-group">
          <label>Nome do Produto</label>
          <InputText value={descricao} onChange={(e) => setDescricao(e.target.value)} required={true} />
        </div>
        <div className="form-group">
          <label>Tipo de Produto</label>
          <select className="form-control" value={tipoId} onChange={(e) => setTipoId(e.target.value)} required>
            <option value="">Selecione</option>
            {tipos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>{tipo.descricao}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Preço</label>
          <InputNumber value={preco} onChange={(e) => setPreco(e.target.value)} required={true} step={"0.01"}/>
        </div>
        <ButtonSalvar desc={editar ? 'Salvar' : 'Cadastrar'} />
        {editar && <ButtonNovo desc={'Novo'} onClick={resetForm} />}
      </form>

      <h3 className="mt-5">Lista de Produto</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Tipo de Produto</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(prod => (
            <tr key={prod.id}>
              <td>{prod.descricao}</td>
              <td>{prod.desc_tipo_produto}</td>
              <td>{prod.preco}</td>
              <td>
                <ButtonEditar onClick={() => funcEditar(prod.id, prod.descricao, prod.produto_tipo_id, prod.preco)} />
                <ButtonInativar onClick={() => funcInativar(prod.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProdutoForm;

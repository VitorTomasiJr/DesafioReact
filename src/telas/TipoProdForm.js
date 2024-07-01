import React, { useState, useEffect } from 'react';
import { baseURL } from '../config';
import axios from 'axios';
import ButtonNovo from '../componentes/ButtonNovo';
import ButtonSalvar from '../componentes/ButtonSalvar';
import ButtonEditar from '../componentes/ButtonEditar';
import ButtonInativar from '../componentes/ButtonInativar';
import InputNumber from '../componentes/InputNumber';
import InputText from '../componentes/InputText';

const TipoProdForm = () => {
  const [descricao, setDescricao] = useState('');
  const [imposto, setImposto] = useState('');
  const [tipos, setTipos] = useState([]);
  const [editar, setEditar] = useState(null);
  const [inativar, setInativar] = useState(null);

  useEffect(() => {
    carregaTipos();
  }, []);

  useEffect(() => {
    if (inativar) {
      requisicao();
    }
  }, [inativar]);

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
      axios.post(baseURL + '/src/tipos_produto.php', { acao: 'editar', id: editar, descricao, perc_imposto: imposto })
        .then(response => {
          console.log(response.data.message);
          resetForm();
          carregaTipos();
        }).catch(error => console.log(error));
    } else if (inativar) {
      axios.post(baseURL + '/src/tipos_produto.php', { acao: 'inativar', id: inativar })
        .then(response => {
          console.log(response.data.message);
          resetForm();
          carregaTipos();
        }).catch(error => console.log(error));
    } else {
      axios.post(baseURL + '/src/tipos_produto.php', { acao: 'novo', descricao, perc_imposto: imposto })
        .then(response => {
          console.log(response.data.message);
          resetForm();
          carregaTipos();
        }).catch(error => console.log(error));
    }
  };

  const funcEditar = (id, descricao, imposto) => {
    setInativar(null);
    setEditar(id);
    setDescricao(descricao);
    setImposto(imposto);
  };

  const funcInativar = (id) => {
    const confirma = window.confirm('Tem certeza que deseja inativar este tipo de produto?');
    if (confirma) {
      setEditar(null);
      setInativar(id);
    }
  };

  const resetForm = () => {
    setDescricao('');
    setImposto('');
    setEditar(null);
    setInativar(null);
  };

  return (
    <div className="mt-5">
      <h2>{editar ? 'Editar Tipo de Produto' : 'Cadastrar Tipo de Produto'}</h2>
      <form onSubmit={funcSubmit}>
        <div className="form-group">
          <label>Nome do Tipo</label>
          <InputText value={descricao} onChange={(e) => setDescricao(e.target.value)} required={true} />
        </div>
        <div className="form-group">
          <label>Percentual de Imposto</label>
          <InputNumber value={imposto} onChange={(e) => setImposto(e.target.value)} required={true} step={"0.01"}/>
        </div>
        <ButtonSalvar desc={editar ? 'Salvar' : 'Cadastrar'}/>
        {editar && <ButtonNovo desc={'Novo'} onClick={resetForm}/>}
      </form>

      <h3 className="mt-5">Lista de Tipos de Produto</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Nome do Tipo</th>
            <th>Percentual de Imposto</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map(tipo => (
            <tr key={tipo.id}>
              <td>{tipo.descricao}</td>
              <td>{tipo.perc_imposto}</td>
              <td>
                <ButtonEditar onClick={() => funcEditar(tipo.id, tipo.descricao, tipo.perc_imposto)}></ButtonEditar>
                <ButtonInativar onClick={() => funcInativar(tipo.id)}></ButtonInativar>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TipoProdForm;

import React from 'react';

const ButtonEditar = ({ onClick }) => {
  return (
    <button className="btn btn-warning" onClick={onClick}>
      Editar
    </button>
  );
};

export default ButtonEditar;

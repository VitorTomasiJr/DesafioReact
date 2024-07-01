import React from 'react';

const ButtonInativar = ({ onClick }) => {
  return (
    <button className="btn btn-danger m-2" onClick={onClick}>
      Inativar
    </button>
  );
};

export default ButtonInativar;

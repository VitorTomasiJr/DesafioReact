import React from 'react';

const ButtonNovo = ({ desc, onClick }) => {
    return (
        <button type="button" className="btn btn-secondary" onClick={onClick}>
            {desc}
        </button>
    )
};

export default ButtonNovo
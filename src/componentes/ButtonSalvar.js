import React from 'react';

const ButtonSalvar = ({ desc }) => {
    return (
        <button type="submit" className="btn btn-primary m-2">
            {desc}
        </button>
    )
};

export default ButtonSalvar
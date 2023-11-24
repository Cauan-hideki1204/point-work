import React from 'react';

import './CardNotice.css';

const CardNotice = ({ title, message }) => {
    return (
        <div className='containerCard'>
            <h1 className='titleCard'>{title}</h1>
            <p className='messageCard'>{message}</p>
        </div>
    );
};

export default CardNotice;

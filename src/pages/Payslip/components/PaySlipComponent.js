import React, { useCallback } from 'react';

import './PaySlipComponent.css'

const HoleriteComponent = ({
    nome, cargo, salario, descontos, beneficios,
}) => {

    const formattedNumber = useCallback((numericValue) => {
        return new Intl.NumberFormat("pt-BR", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(numericValue);
      }, [])

    return (
        <div className='holeriteContainer'>
            <div>
                <h2 className='holeriteTitle1'>Nome: {nome}</h2>
                <p className='holeriteInfo'>Cargo: {cargo}</p>
                <p className='holeriteInfo'>Salário: R$ {formattedNumber(salario)}</p>

            </div>
            <div className='holeriteDescontos'>
                <h3>Descontos</h3>
                <ul>
                    {descontos.map((desconto, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <li key={index}>{desconto}</li>
                    ))}
                </ul>
            </div>

            <div className='holeriteBeneficios'>
                <h3>Benefícios</h3>
                <ul>
                    {beneficios.map((beneficio, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <li key={index}>{beneficio}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HoleriteComponent;

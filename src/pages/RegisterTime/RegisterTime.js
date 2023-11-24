import React from 'react';

import Clock from './components/Clock';
import './RegisterTime.css';

const Register = () => {
    return (
        <div>
            <div className='containerHeaderRegister'>
                <p className='titleRegister'>Registro de ponto</p>
            </div>
            <div className='containerContentRegister'>
                <Clock />
            </div>
        </div>
    );
};

export default Register;

import React, { useState, useEffect } from 'react';
import './Clock.css';
import useAsync from '../../../hooks/use-async';
import { useSelector } from 'react-redux';
import useAxios from '../../../hooks/use-axios';
import Toast from '../../../helpers/toast';

const Clock = () => {
    const axios = useAxios();

    const [currentTime, setCurrentTime] = useState(new Date());

    const userId = useSelector(state => state.user.id);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const { loading, call: markTimePoint } = useAsync(async () => {

        try {
            await axios.get(`/cartao-ponto/${userId}`);

            Toast('success', 'Registro adicionado com sucesso!');

        } catch (exception) {
            Toast('error', 'Não foi possível realizar a operação, tente novamente mais tarde.');
        }

    }, [axios, userId]);

    const formatTime = time => {
        const hours = String(time.getHours()).padStart(2, '0');
        const minutes = String(time.getMinutes()).padStart(2, '0');
        const seconds = String(time.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <>
            <div className="containerClock">
                <h2 className="textClock">Registre seu ponto!</h2>
                <p className="textClock">{formatTime(currentTime)}</p>

                <button className='buttonRegisterTime' onClick={markTimePoint}>Registrar ponto</button>
            </div>
        </>
    );
};

export default Clock;

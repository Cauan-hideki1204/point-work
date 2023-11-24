import React, { useState } from 'react';

import './CreateNotice.css';
import useAxios from '../../hooks/use-axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAsync from '../../hooks/use-async';
import Toast from '../../helpers/toast';

const CreateNoticeScreen = () => {

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const state = useSelector(state => state.user.id);

    const axios = useAxios();
    const navigate = useNavigate();

    const { loading, call: handleAddNotice } = useAsync(async values => {

        const { title, message } = values;

        try {
            await axios.post(`registrar-avisos/${state}`, {
                titulo: title,
                conteudo: message,
            });

            Toast('success', 'Aviso adicionado com sucesso!')

            navigate('/avisos');

        } catch (exception) {
            Toast('error');
        }

    }, [axios, state, navigate]);

    return (
        <div>
            <div className='containerHeaderCreateNotice'>
                <p className='titleCreateNotice'>Criar aviso</p>
            </div>
            <div className='containerContentCreate'>
                <input
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='inputTitleCreateNotice'
                />
                <textarea
                    placeholder="Mensagem"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className='input'
                    type=''
                />

                <button
                    className='buttonSubmitCreateNotice'
                    onClick={() => handleAddNotice({
                        title: title,
                        message: message,
                    })}
                >
                    Adicionar novo aviso
                </button>
            </div>
        </div>
    );
};

export default CreateNoticeScreen;

import React, { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import useDidMount from '../../hooks/use-did-mount';

import CardNotice from './components/CardNotice';
import './ListNotice.css';

import { IoMdAdd } from 'react-icons/io'
import useAsync from '../../hooks/use-async';
import useAxios from '../../hooks/use-axios';
import Toast from '../../helpers/toast';

const ListNotice = () => {

    const [notices, setNotices] = useState(null);

    const navigate = useNavigate();
    const axios = useAxios();

    const { loading, call: getListNotice } = useAsync(async () => {

        try {
            const response = await axios.get('avisos');

            return setNotices(response.data);
        } catch (exception) {
            return Toast('error')
        }

    }, [axios]);

    useDidMount(() => {
        getListNotice();
    }, [getListNotice]);

    const renderButton = useCallback(() => {
        return (
            <div>
                <button
                    type="primary"
                    onClick={() => navigate('/avisos/criar')}
                    className='buttonAddNotice'
                >
                    <IoMdAdd /> Adicionar novo aviso
                </button>
            </div>
        );
    }, [navigate]);

    const renderItem = value => {
        if (!value) return null;

        return (
            <CardNotice title={value.titulo} message={value.conteudo} key={value.id} />
        );
    };

    const renderContent = () => {
        if (notices?.length === 0 || !notices) {
            return (<span> sem avisos por enquanto</span>);
        }

        return notices.map(renderItem);
    };

    return (
        <div>
            <div className='containerHeaderNotice'>
                <p className='titleNotice'>Avisos</p>
                {renderButton()}
            </div>
            <div className='containerContent'>
                {renderContent()}
            </div>
        </div>
    );
};

export default ListNotice;

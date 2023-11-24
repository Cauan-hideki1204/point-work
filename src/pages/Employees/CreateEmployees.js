import React, { useState } from 'react';

import './CreateEmployees.css';
import useAxios from '../../hooks/use-axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAsync from '../../hooks/use-async';
import Toast from '../../helpers/toast';

const CreateEmployees = ({ form }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [emailValido, setEmailValido] = useState(true);

    const userId = useSelector(state => state.user.id);

    const axios = useAxios();
    const navigate = useNavigate();

    const { loading, call: handleAddEmployees } = useAsync(async (values) => {

        const { name, email, password, cpf } = values;

        try {
            await axios.post('registrar', {
                nome: name,
                email: email,
                cpf: cpf,
                senha: password,
                cargo: '1',
                admissao: "2023-09-01",
            });

            Toast('success', 'Funcionário adicionado com sucesso!')

            navigate('/funcionarios');

        } catch (exception) {
            Toast('error', 'Não foi possível realizar a operação, tente novamente mais tarde.');
        }

    }, [axios, form, userId, navigate]);

    const validarEmail = (email) => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regexEmail.test(email);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailValido(validarEmail(e.target.value));
    };

    return (
        <div>
            <div className='containerHeaderCreateEmployees'>
                <p className='titleCreateEmployees'>Criar funcionário</p>
            </div>
            <div className='containerContentCreate'>
                <input
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='input'
                />
                <input
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className={emailValido ? 'input' : 'invalidInput'}
                />
                <input
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='input'
                    minLength={5}
                />
                <input
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className='input'
                    maxLength={11}
                />

                <button
                    className='buttonSubmitCreateEmployees'
                    onClick={() => handleAddEmployees({
                        name,
                        email,
                        password,
                        cpf
                    })}
                > Adicionar novo funcionário</button>
            </div>
        </div>
    );
};

export default CreateEmployees;

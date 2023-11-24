import React, {useState } from 'react';
import logo from '../../assets/Point work.png'

import useAsync from '../../hooks/use-async';
import useAxios from '../../hooks/use-axios';
import { useDispatch } from 'react-redux';

import './Login.css'
import { useNavigate } from 'react-router-dom';
import { dataUser } from '../../redux/userSlice';
import Toast from '../../helpers/toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValido, setEmailValido] = useState(true);

  const navigate = useNavigate()

  const axios = useAxios();

  const dispatch = useDispatch();

  const { loading, call: loginRequest } = useAsync(async values => {

    try {
      const { username, password } = values;

      const response = await axios.post('/login', { email: username, senha: password });

      if (response.data.msg === 'Usuário não encontrado' || response.data.msg === 'Senha incorreta') {
        return Toast('error');
      }

      dispatch(dataUser(response.data.id))

      return navigate('/home');
    } catch (exception) {
      return Toast('error');
    }

  }, [axios, dispatch]);

  const validarEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regexEmail.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValido(validarEmail(e.target.value));
  };

  const isDisabled = (!email || email === '') || (!password || password === '');

  return (
    <div className='containerLogin'>
      <img
        className='logoImage'
        src={logo}
        alt="Logotipo Point work"
      />
      <p className='textLogin'>
        Login
      </p>

      <div className='formContainer'>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          className={emailValido ? 'input' : 'invalidInput'}
        />

        {!emailValido ? <p className='textInvalidEmail'>Email inválido</p> : null}

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='input'
        />

        <div className="checkboxContainer">
          <button type="link" size="large" className="link">
            Esqueceu sua senha?
          </button>
        </div>

        <button
          onClick={() => loginRequest({
            username: email,
            password: password
          })}
          className={isDisabled ? 'buttonSubmitDisabled' : 'buttonSubmit'}
          disabled={isDisabled}
        >
          Acessar
        </button>

      </div>

      <div className="footerTitle">
        <p>
          Point work
        </p>
      </div>

    </div>
  );
};

export default Login;
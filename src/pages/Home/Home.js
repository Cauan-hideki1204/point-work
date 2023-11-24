import React from 'react';
import logo from '../../assets/Point work.png'
import { BsPeopleFill } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { BiStopwatch } from 'react-icons/bi'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import './Home.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className="containerHome">
            <img
                src={logo}
                alt="Logotipo Point work"
                className="imageLogo"
            />
            <p className="textWelcome">Bem-vindos ao Painel Administrativo PointWork!</p>
            <p className="textHelp">O que você gostaria de fazer?</p>
            <div className="shortcutsContainer">
                <div>
                    <button
                        type="button"
                        className="button"
                        onClick={() => navigate('/funcionarios')}
                    >
                        <BsPeopleFill color='#FFFFFF'/>
                    </button>

                    <p className="title">Funcionários</p>
                </div>
                <div>
                    <button
                        type="button"
                        className="button"
                        onClick={() => navigate('/holerite')}
                    >
                        <HiOutlineDocumentText color='#FFFFFF'/>
                    </button>

                    <p className="title">Holerite</p>
                </div>

                <div>
                    <button
                        type="button"
                        className="button"
                        onClick={() => navigate('/ponto')}
                    >
                        <BiStopwatch color='#FFFFFF'/>
                    </button>

                    <p className="title">Registro de ponto</p>
                </div>

                <div>
                    <button
                        type="button"
                        className="button"
                        onClick={() => navigate('/avisos')}
                    >
                        <AiOutlineInfoCircle color='#FFFFFF'/>
                    </button>

                    <p className="title">Avisos</p>
                </div>
            </div>
        </div>
    )
}

export default Home;
import React, { useCallback, useState } from 'react';
import { FaBars } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/Point work.png'
import { AiOutlineHome, AiOutlineInfoCircle } from 'react-icons/ai';
import { BiStopwatch } from 'react-icons/bi';
import { BsPeopleFill } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci'
import { HiOutlineDocumentText } from 'react-icons/hi';

import './Sidebar.css'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

const Sidebar = ({ children }) => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const [openModal, setOpenModal] = React.useState(false);

    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const handleClose = useCallback(() => {
        setOpenModal(false);
    }, []);

    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/home",
            name: "home",
            icon: <AiOutlineHome />
        },
        {
            path: "/avisos",
            name: "avisos",
            icon: <AiOutlineInfoCircle />
        },
        {
            path: "/ponto",
            name: "Ponto",
            icon: <BiStopwatch />
        },
        {
            path: "/funcionarios",
            name: "funcionarios",
            icon: <BsPeopleFill />
        },
        {
            path: "/holerite",
            name: "holerite",
            icon: <HiOutlineDocumentText />
        },
    ]

    const renderLogout = useCallback(() => {
        if (isOpen) {
            return (
                <button onClick={handleClickOpen} className='buttonLogout'>logout</button>
            )
        }

        return <CiLogout size={32} className='iconLogout' onClick={handleClickOpen} />
    }, [isOpen])

    return (
        <div className="container">
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <div style={{ display: isOpen ? "block" : "none" }} className="logo">
                        <img
                            src={logo}
                            alt="Logotipo Point work"
                            className="imageLogoSidebar"
                        />
                    </div>
                    <div style={{ marginLeft: isOpen ? "50px" : "-3px", marginTop: isOpen ? "-10px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }

                <div className='containerLogout'>{renderLogout()}</div>

            </div>
            <main>{children}</main>

            <Dialog
                open={openModal}
                onClose={handleClose}
            >
                <DialogTitle>
                    Deseja realmente sair ?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={() => navigate('/')}>Sair</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Sidebar;
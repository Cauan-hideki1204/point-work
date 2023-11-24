import React, { useState } from 'react'

import {
    Table, TableBody, TableCell,
    TableContainer, TableHead,
    TableRow, Paper
} from '@mui/material';

import './Employees.css'
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import useAsync from '../../hooks/use-async';
import useDidMount from '../../hooks/use-did-mount';
import useAxios from '../../hooks/use-axios';
import Toast from '../../helpers/toast';

const Employees = () => {

    const axios = useAxios();

    const navigate = useNavigate();

    const [employees, setEmployees] = useState(null);

    function formatCPF(cpf) {
        if (!cpf) return null;
    
        let formatedCPF = cpf;
    
        if (typeof cpf === 'number') {
            formatedCPF = cpf.toString();
        }
    
        formatedCPF = formatedCPF.replace(/\D/g, '');

        formatedCPF = formatedCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    
        return formatedCPF;
    }

    const { loading, call: getListEmployees } = useAsync(async () => {

        try {
            const response = await axios.get('funcionarios');

            return setEmployees(response.data);
        } catch (exception) {
            return Toast('error')
        }

    }, [axios]);

    useDidMount(() => {
        getListEmployees();
    }, [getListEmployees]);

    const renderContent = () => {
        if (!employees) {
            return (
                <div>
                    você não tem funcionários cadastrados
                </div>
            )
        }

        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>CPF</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    {row.nome}
                                </TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{formatCPF(row.cpf)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return (

        <div>
            <div className='containerHeaderEmployees'>
                <p className='titleEmployees'>Funcionários</p>

                <div>
                    <button
                        type="primary"
                        onClick={() => navigate('/funcionarios/criar')}
                        className='buttonAddEmployees'
                    >
                         <AiOutlineUserAdd /> Adicionar novo funcionário
                    </button>
                </div>
            </div>
            <div className='containerContent'>
                {renderContent()}
            </div>
        </div>
    );
}

export default Employees;
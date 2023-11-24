import React, { useCallback, useState } from 'react';

import HoleriteComponent from './components/PaySlipComponent';

import './Payslip.css'
import useAsync from '../../hooks/use-async';
import useAxios from '../../hooks/use-axios';
import useDidMount from '../../hooks/use-did-mount';
import { useSelector } from 'react-redux';
import Toast from '../../helpers/toast';

const PaySlip = () => {
    const [payslip, setPayslip] = useState(null);

    const axios = useAxios();

    const { loading, call: getPaySlip } = useAsync(async () => {

        try {
            const response = await axios.get(`holerite`);

            return setPayslip(response.data);
        } catch (exception) {
            return Toast('error')
        }

    }, [axios]);

    useDidMount(() => {
        getPaySlip();
    }, [getPaySlip]);

    const renderContent = useCallback(() => {
        if (!payslip) return null

        return (
            <div className='containerContent'>
                <HoleriteComponent
                    nome={payslip.nome}
                    cargo={payslip.cargo}
                    salario={payslip.salario}
                    descontos={payslip.descontos}
                    beneficios={payslip.beneficios}
                />
            </div>
        )
    }, [payslip])

    return (
        <div>
            <div className='containerHeaderPaySlip'>
                <p className='titlePaySlip'>Holerite</p>
            </div>
            {renderContent()}
        </div>
    );
};

export default PaySlip;

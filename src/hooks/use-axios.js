import { useEffect, useMemo, useState } from 'react';

import Axios from 'axios';

const { CancelToken } = Axios;

const useAxios = axiosOptions => {
    // 'axiosOptions' é transformado em um state para evitar mutabilidade.
    const [options] = useState(axiosOptions);

    const source = useMemo(() => CancelToken.source(), []);

    const axios = useMemo(() => {

        const instance = Axios.create({
            baseURL: 'http://localhost:3001/',
            // ajustar aqui localhost
            ...options,
            cancelToken: source.token,
        });

        return instance;

    }, [source, options]);

    useEffect(() => {
        return () => {
            source.cancel('Operation canceled by unmounted component.');
        };
    }, [source]);

    return axios;
};

export default useAxios;

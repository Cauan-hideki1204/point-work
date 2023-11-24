import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = (type, message) => {
    if (type === 'error') {
        return toast.error('Não foi possível realizar a operação, tente novamente mais tarde.');
    }

    return toast.success(message);
}

export default Toast;
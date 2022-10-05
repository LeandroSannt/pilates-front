import { CheckCircle } from 'phosphor-react';
import { ReactNode } from 'react';
import { toast } from 'react-toastify';

const popSucess = (text: ReactNode) => {
  return toast.success(text, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    progressClassName: 'bg-white',
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: 'w-[350px] -ml-14 bg-concluded text-white',
    icon: <CheckCircle className="w-6 h-6" />,
  });
};

export { popSucess };

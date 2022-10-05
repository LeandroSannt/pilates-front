import { Info } from 'phosphor-react';
import { ReactNode } from 'react';
import { toast } from 'react-toastify';

const popInfo = (text: ReactNode) => {
  return toast.info(text, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    progressClassName: 'bg-white',
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: 'w-[350px] h-32 -ml-14 bg-purple2 text-white',
    icon: <Info size={52} />,
  });
};

export { popInfo };

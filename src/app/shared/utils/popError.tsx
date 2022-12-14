import { ReactNode } from 'react';
import { toast } from 'react-toastify';

const popError = (text: ReactNode) => {
  return toast.error(text, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    progressClassName: 'bg-white',
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: 'md:w-[350px] w-[250px]  bg-notSent text-white',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  });
};

export { popError };


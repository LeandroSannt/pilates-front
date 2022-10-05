import { Dialog } from '@headlessui/react';
import React, { ReactNode, useRef } from 'react';

import { Button, CancelButton } from './styles';

interface IModalDeleteContentProps {
  onClick?: React.Dispatch<React.SetStateAction<boolean>>;
  icon?: ReactNode;
  text?: ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  handleDeleteItem: (itemId: number) => void;
}

const ModalDeleteContent: React.FC<IModalDeleteContentProps> = ({
  onClick,
  icon,
  setIsOpen,
  title,
  text,
  handleDeleteItem,
}) => {
  const cancelButtonRef = useRef(null);
  return (
    <>
      <div>
        <div className="mx-auto flex items-center justify-center rounded-full">
          {icon}
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="leading-6 text-2xl font-bold text-blue1000"
          >
            {title}
          </Dialog.Title>
          <div className="mt-4 md:px-16 px-5">{text}</div>
        </div>
      </div>
      <div className="mt-5 text-white sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense text-white1">
        <Button type="button" onClick={handleDeleteItem}>
          Confirmar
        </Button>
        <CancelButton
          type="button"
          onClick={() => setIsOpen(false)}
          ref={cancelButtonRef}
        >
          Voltar
        </CancelButton>
      </div>
    </>
  );
};

export { ModalDeleteContent };

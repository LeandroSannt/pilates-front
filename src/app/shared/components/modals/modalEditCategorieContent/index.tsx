import { Dialog } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { ICreateUser } from '../../../interfaces/user';
import { manageUsersService } from '../../../services/manage-users';
import { usersSchema } from '../../../validations/manage-users';
import SearchInput from '../../common/Input';
import { Select } from '../../common/Select';
import { AtSymbol, Identification, UserInputIcon, X } from '../../icons';
import { Button } from '../modalDeleteContent/styles';
import { Container } from './styles';

interface IModalEditUserProps {
  onClick?: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser?: ICreateUser;
  currentUserPerfil: string;
  isModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalEditUser: React.FC<IModalEditUserProps> = ({
  onClick,
  currentUser,
  currentUserPerfil,
  isModalOpen,
}) => {
  const perfil = [
    { name: currentUserPerfil },
    {
      name:
        currentUserPerfil === 'Colaborador' ? 'Adminstrador' : 'Colaborador',
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(usersSchema),
  });
  const { updateUsersById } = manageUsersService();
  const { mutate: updateUser } = useMutation(updateUsersById);
  const [inputSelectError, setInputSelectError] = useState(false);
  const [valueSelect, setValueSelect] = useState<Object>();
  const value = valueSelect as { name: string };
  const verifySelect = () => {
    if (value.name === 'Perfil') {
      setInputSelectError(true);
    }
  };
  const handleSubmitEditUser: SubmitHandler<ICreateUser> = async (data) => {
    if (currentUser?.id) {

    }
  };

  return (
    <>
      <div
        onClick={() => isModalOpen?.(false)}
        className="md:ml-[97%] ml-[90%] cursor-pointer"
      >
        <X />
      </div>

      <Container>
        <div className="text-center -mb-4">
          <Dialog.Title
            as="h3"
            className="leading-6 mb-2 text-[20px] font-black uppercase text-blue-4"
          >
            Editar Usuário
          </Dialog.Title>
          <span>
            Editar informações de <strong>"{currentUser?.full_name}"</strong>
          </span>
        </div>
        <form onSubmit={handleSubmit(handleSubmitEditUser)}>
          <div className="flex flex-col gap-4">
            <SearchInput
              defaultValue={currentUser?.full_name}
              disabled={isSubmitting}
              {...register('username')}
              inputStyle={`w-full ${
                errors.username && 'border border-red-500'
              }`}
              icon={<UserInputIcon />}
              placeholder="Username"
            />
            <Select
              defaultValue={perfil[0]}
              data={perfil}
              setValueSelect={setValueSelect}
              styleContainer={`w-full ${
                inputSelectError ? 'border-red-500 border' : ''
              }`}
              icon={<Identification />}
            />

            <SearchInput
              type="email"
              defaultValue={currentUser?.email}
              disabled={isSubmitting}
              {...register('email')}
              inputStyle={`w-full ${
                errors.username && 'border border-red-500'
              }`}
              icon={<AtSymbol />}
              placeholder="E-mail"
            />

            <Button
              onClick={verifySelect}
              type="submit"
              className="bg-button-1 text-white w-full uppercase flex items-end  mb-7"
            >
              Salvar Alterações
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export { ModalEditUser };


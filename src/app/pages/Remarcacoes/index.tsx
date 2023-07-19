import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { SyncLoader } from 'react-spinners';
import * as Yup from 'yup';

import { api } from '../../../config/api';
import { queryClient } from '../../../config/query-Client';
import { Input } from '../../shared/components/Form/Input/InputText';
import LineTable from '../../shared/components/LineTableRemarcacoes';
import { DefaultModal } from '../../shared/components/modals/DefaultModal';
import Pagination from '../../shared/components/Pagination';
import {
  ExchangedPaginated,
  StudentProps,
} from '../../shared/interfaces/students';
import getValidationErrors from '../../shared/utils/getValidationErros';
import { popError } from '../../shared/utils/popError';
import { popSucess } from '../../shared/utils/popSuccess';
import { CreateAula } from '../Aulas/styles';
import { Container, Filters, Table } from './styles';

interface FilterProps {
  student_id?: string;
}

export interface ModalProps {
  hasOpen: boolean;
  itemId?: number;
}
const Remarcacoes: React.FC = () => {
  const [page, setPage] = useState<string | null | undefined>('/?page=1');
  const [filters, setFilters] = useState<FilterProps>();
  const [itemId, setItemId] = useState<number>();
  const [hasOpen, setHasOpen] = useState<ModalProps>({ hasOpen: false });
  const formRef = useRef<FormHandles>(null);

  const {
    data: studentExchange,
    isFetching,
    isLoading,
  } = useQuery<ExchangedPaginated>(
    ['exchanges', page, filters?.student_id],
    async () => {
      const response = await api.get(`/exchanges/listPaginated${page}`, {
        params: {
          student_id: filters?.student_id,
        },
      });

      return response.data;
    }
  );

  const { data: studentExchangeNoPaginated } = useQuery<StudentProps[]>(
    ['exchangesNoPaginated'],
    async () => {
      const response = await api.get(`/exchanges/list`);

      return response.data;
    }
  );

  const changePage = (type: 'next' | 'previous') => {
    if (type === 'next') {
      setPage(studentExchange?.meta.next_page_url);
    } else {
      setPage(studentExchange?.meta.previous_page_url);
    }
  };

  const finishExchange = async (id: number) => {
    const result = await api.patch(`/exchanges/finish`, {
      exchangeId: id,
    });

    await queryClient.invalidateQueries('exchanges');

    popSucess('Reposição concluida');
  };

  const handleSubmit = async (data: any) => {
    const { date } = data;
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        date: Yup.string().required('Data obrigatoria'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.patch(`/exchanges/update-day`, {
        date: moment(date).format(),
        id: hasOpen.itemId,
      });

      popSucess('Data da reposição atualizada');
      setHasOpen({ hasOpen: false });
      await queryClient.invalidateQueries('exchanges');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        popError('Preencha o campo obrigatorio');
        return;
      }
    }
  };

  return (
    <Container>
      <main>
        <DefaultModal
          width="90%"
          margin="auto 0"
          isOpen={hasOpen.hasOpen}
          setIsOpen={() => {
            setHasOpen({ ...hasOpen, hasOpen: true });
          }}
          content={
            <div className="flex flex-col items-center">
              <div className=" flex justify-between w-full">
                <h1 className="text-center mb-5">Atualizar dia da reposição</h1>
                <span
                  onClick={() => {
                    setHasOpen({ hasOpen: false });
                  }}
                >
                  <AiOutlineClose cursor={'pointer'} />
                </span>
              </div>

              <CreateAula>
                <Form
                  ref={formRef}
                  className="flex items-center justify-center flex-col h-72"
                  onSubmit={handleSubmit}
                >
                  <Input type={'date'} name="date" />
                  <button
                    type="submit"
                    className=" mt-5 btn text-white border-none   bg-secundary hover:bg-secundaryOpacity w-full"
                  >
                    Atualizar Reposição
                  </button>
                </Form>
              </CreateAula>
            </div>
          }
        />

        <h1 className="font-bold text-xl">Reposições</h1>
        <Filters>
          <div>
            <div>
              <label htmlFor="">Aluno</label>
              <select
                onChange={(e) => {
                  setFilters({ ...filters, student_id: e.target.value });
                }}
                className="select select-primary w-full "
              >
                <option value={'todos'}>Todos</option>
                {studentExchangeNoPaginated?.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Filters>

        <Table>
          {isLoading ? (
            <div className="flex items-center justify-center mt-28">
              <SyncLoader color="#1fcab3" />
            </div>
          ) : !!studentExchange?.data.length ? (
            studentExchange?.data.map((student) => (
              <LineTable
                finishExchange={finishExchange}
                key={student.id}
                total_exchanges={student.total_exchanges}
                exchange={student.exchange}
                id={student.id}
                name={student.name}
                itemId={itemId}
                setHasOpen={setHasOpen}
                telephone={student.telephone}
              />
            ))
          ) : (
            <div className="font-bold flex items-center justify-center mt-28">
              <h1>Nenhum Aluno Encontrado</h1>
            </div>
          )}
        </Table>
      </main>

      <Pagination
        changePage={changePage}
        current_page={studentExchange?.meta.current_page || 0}
        first_page={studentExchange?.meta.first_page || 0}
        last_page={studentExchange?.meta.last_page || 0}
      />
    </Container>
  );
};
export default Remarcacoes;

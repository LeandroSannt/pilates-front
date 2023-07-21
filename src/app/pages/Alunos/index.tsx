import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import SyncLoader from 'react-spinners/SyncLoader';

import { api } from '../../../config/api';
import { queryClient } from '../../../config/query-Client';
import LineTable from '../../shared/components/LineTable';
import Pagination from '../../shared/components/Pagination';
import {
  PlanProps,
  StudentProps,
  StudentsPaginated,
} from '../../shared/interfaces/students';
import { Container, Filters, Table } from './styles';
import { useToast } from 'react-toastify';
import { popSucess } from '../../shared/utils/popSuccess';

interface FilterProps {
  studantName?: string;
  status?: string;
  planId?: string;
}

const Alunos: React.FC = () => {
  const [students, setStudents] = useState<StudentProps[]>([]);
  const [filters, setFilters] = useState<FilterProps>();
  const [page, setPage] = useState<string | null | undefined>('/?page=1');
  const [currentStudentId, setCurrentStudentId] = useState(0);
  const [typeTransaction, setTypeTransaction] = useState('');

  const { data: studantesPaginated, isLoading } = useQuery<StudentsPaginated>(
    ['students', page, filters?.planId, filters?.status, filters?.studantName],
    async () => {
      const response = await api.get(`/students/paginated${page}`, {
        params: {
          status: filters?.status,
          name: filters?.studantName,
          planId: filters?.planId,
        },
      });

      return response.data;
    },
    { onSuccess: (data: StudentsPaginated) => setStudents(data.data) }
  );

  const { data: plans } = useQuery<PlanProps[]>(['plans'], async () => {
    const response = await api.get('/plans');

    return response.data;
  });

  const changePage = (type: 'next' | 'previous') => {
    if (type === 'next') {
      setPage(studantesPaginated?.meta.next_page_url);
    } else {
      setPage(studantesPaginated?.meta.previous_page_url);
    }
  };

  const renovationPlan = async (id: number) => {
    setCurrentStudentId(id);

    if (typeTransaction) {
      await api.patch(`/students/renovation-plan/${id}`, {
        typeTransaction,
      });
      await queryClient.invalidateQueries('students');

      popSucess('Pagamento registrado');
      setCurrentStudentId(0);
      setTypeTransaction('');
    }
  };

  return (
    <Container>
      <main>
        <h1 className="font-bold text-xl">Alunos</h1>
        <Filters className="">
          <div>
            <div>
              <label htmlFor="">Alunos</label>
              <input
                onChange={(e) => {
                  setFilters({ ...filters, studantName: e.target.value });
                }}
                type="text"
                placeholder="Pesquisar aluno"
                className="input input-bordered input-primary w-full "
              />
            </div>
            <div>
              <label htmlFor="">Status</label>
              <select
                onChange={(e) => {
                  setFilters({ ...filters, status: e.target.value });
                }}
                className="select select-primary w-full "
              >
                <option value={'todos'}>Todos</option>
                <option value={'ativo'}>Ativo</option>
                <option value={'a vencer'}>a vencer</option>
                <option value={'vencido'}>vencido</option>
              </select>
            </div>
            <div>
              <label htmlFor="">Planos</label>
              <select
                onChange={(e) => {
                  setFilters({ ...filters, planId: e.target.value });
                }}
                className="select select-primary w-full "
              >
                <option value={'todos'}>Todos</option>
                {plans?.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name_plan}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Link to="create">
            <button className="btn text-white border-none  bg-secundary hover:bg-secundaryOpacity">
              CADASTRAR ALUNOS
            </button>
          </Link>
        </Filters>

        <Table>
          {isLoading ? (
            <div className="flex items-center justify-center mt-28">
              <SyncLoader color="#1fcab3" />
            </div>
          ) : !!students.length ? (
            studantesPaginated?.data?.map((student) => {
              return (
                <LineTable
                  setTypeTransaction={setTypeTransaction}
                  typeTransaction={typeTransaction}
                  selectedStudentId={currentStudentId}
                  renovation={renovationPlan}
                  key={student.id}
                  day={student.day_birth}
                  month={student.month_birth}
                  currentMonthPlan={student.current_month_plan}
                  planTotalMonths={student.plan.amount_installments}
                  status={student.status}
                  expiration_date={student.expiration_date}
                  plan_expiration_day={student.plan_expiration_day}
                  birth_date={student.birth_date}
                  id={student.id}
                  name={student.name}
                  plan={student.plan.name_plan}
                />
              );
            })
          ) : (
            <div className="font-bold flex items-center justify-center mt-5  min-h-[300px] ">
              <h1>Nenhum Aluno Encontrado</h1>
            </div>
          )}
        </Table>
      </main>

      <Pagination
        changePage={changePage}
        current_page={studantesPaginated?.meta.current_page || 0}
        first_page={studantesPaginated?.meta.first_page || 0}
        last_page={studantesPaginated?.meta.last_page || 0}
      />
    </Container>
  );
};

export default Alunos;

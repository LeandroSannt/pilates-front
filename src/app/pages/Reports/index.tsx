import React, { useState } from 'react';
import { useQuery } from 'react-query';
import SyncLoader from 'react-spinners/SyncLoader';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { getMonth } from 'date-fns';

import { api } from '../../../config/api';
import { FinancialProps, StudentProps } from '../../shared/interfaces/students';
import { birthDate, financialReport } from './main';
import { Container } from './styles';
import { monthsPerYear } from '../../shared/utils/monthPerYear';
import 'moment/dist/locale/pt-br';
import moment from 'moment';

import 'react-tabs/style/react-tabs.css';

const Financial: React.FC = () => {
  const { data: financial, isLoading } = useQuery<FinancialProps>(
    ['financial'],
    async () => {
      const response = await api.get('/report/financial');

      return response.data;
    }
  );

  const handleExport = async () => {
    if (financial) {
      // financialReport(financial)
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-28">
        <SyncLoader color="#1fcab3" />
      </div>
    );
  }

  return (
    <Container>
      <h1 className="font-bold text-lg mb-5 mt-5">Relatorio Financeiro</h1>
      <div className="md:flex-row flex-col flex justify-between">
        <div className="flex flex-col  mb-5">
          <span>
            Valor Total: <strong>{financial?.sum_value}</strong>
          </span>
          <span>
            Valor a Descontar: <strong>{financial?.sum_percent_rate}</strong>
          </span>
          <span>
            Valor a Receber: <strong>{financial?.sum_amount_receivable}</strong>
          </span>
        </div>

        <button
          onClick={handleExport}
          className="md:mb-0 mb-5 btn text-white border-none  bg-secundary hover:bg-secundaryOpacity"
        >
          Exportar relatorio
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Plano</th>
              <th>Valor do Plano</th>
              <th>Comissão</th>
              <th>Receber</th>
            </tr>
          </thead>
          <tbody>
            {financial?.studentExpiration.map((financialProps) => (
              <tr>
                <td>{financialProps.name}</td>
                <td>
                  {financialProps.expiration_date} /{' '}
                  {financialProps.plan.amount_installments}
                </td>
                <td>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(Number(financialProps.plan.value.toFixed(2)))}
                </td>
                <td>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(
                    Number(financialProps.total_percent_rate.toFixed(2))
                  )}
                </td>
                <td>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(
                    Number(financialProps.calc_amount_receivable.toFixed(2))
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

const BirthDate: React.FC = () => {
  const currentMonth = moment().format('MMMM');
  const [month, setMonth] = useState(currentMonth);

  const months = monthsPerYear();
  const { data: students, isLoading } = useQuery<StudentProps[]>(
    ['studentBirthDate', month],
    async () => {
      const response = await api.get('/studentsbirth/birthDate', {
        params: {
          month: month,
        },
      });

      return response.data;
    }
  );

  const handleExport = async () => {
    if (students) {
      birthDate(students);
    }
  };

  if (isLoading) {
    <div className="flex items-center justify-center mt-28">
      <SyncLoader color="#1fcab3" />
    </div>;
  }

  return (
    <Container>
      <div className="md:flex-row flex-col items-center flex justify-between mt-5">
        <h1 className="font-bold text-lg mb-5">Aniversariantes do Mês</h1>
        <div className="flex md:flex-row flex-col md:gap-5 md:w-max w-full  ">
          <button
            onClick={handleExport}
            className="mb-5 btn text-white border-none  bg-secundary hover:bg-secundaryOpacity"
          >
            Exportar Relatorio{' '}
          </button>

          <select
            className=" mb-5 md:ml-0  select select-primary "
            value={month}
            onChange={(event) => {
              setMonth(event.target.value);
            }}
            name=""
            id=""
          >
            {months.map((month) => {
              return <option value={month.month}>{month.month}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Data de anivesário</th>
            </tr>
          </thead>
          <tbody className="">
            {students?.map((student) => (
              <tr>
                <td>{student.name}</td>
                <td>{student.telephone}</td>
                <td>{`${student.day_birth} - ${student.month_birth}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

const Reports: React.FC = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Financeiro</Tab>
        <Tab>Aniversariantes</Tab>
      </TabList>

      <TabPanel>
        <Financial />
      </TabPanel>
      <TabPanel>
        <BirthDate />
      </TabPanel>
    </Tabs>
  );
};
export default Reports;

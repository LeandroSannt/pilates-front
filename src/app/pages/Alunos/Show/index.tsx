import moment from 'moment';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { api } from '../../../../config/api';

import { Container, Filters } from './styles';
import { StudentProps } from '../../../shared/interfaces/students';
import { SyncLoader } from 'react-spinners';
import { PlanPeriod } from '../Details';

interface Payments {
  payment_with_machine_interest: number;
  payment: number;
  type_payment: string;
  created_at: string;
  id: number;
  student: StudentProps;
}

interface PaymentPayload {
  paymentsNew: Payments[];
  sumPayments: {
    payment_total: string;
    sumParcels: number;
    sum_payments_machine: number;
  };
}

interface ReponseStudentPlanPeriod {
  student: StudentProps;
  planPeriod: PlanPeriod;
}

const Show: React.FC = () => {
  const { student_id } = useParams();

  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');

  const { data: studentPlan } = useQuery<ReponseStudentPlanPeriod>(
    ['studantPlan', student_id],
    async () => {
      const response = await api.get(`/students/${student_id}`);

      const responsePlan = await api.get(
        `/plans/${response.data.plan_id}/expiry-period`
      );

      return {
        student: response.data,
        planPeriod: responsePlan.data,
      };
    }
  );

  const { data, isLoading } = useQuery<PaymentPayload>(
    ['payments', student_id, initialDate, finalDate],
    async () => {
      const response = await api.get(`/payment/${student_id}/students`, {
        ...(initialDate &&
          finalDate && {
            params: {
              finalDate,
              initialDate,
            },
          }),
      });
      return response.data;
    }
  );

  if (!data || !studentPlan) {
    return (
      <div className="flex items-center justify-center mt-48">
        <SyncLoader color="#1fcab3" />
      </div>
    );
  }

  return (
    <Container>
      <h1 className="mb-5 text-xl font-bold">
        Relatorio de pagamento - {studentPlan?.student?.name}
      </h1>
      <Filters className="">
        <div>
          <div>
            <label htmlFor="">De</label>
            <input
              onChange={(e) => {
                setInitialDate(e.target.value);
              }}
              value={initialDate}
              type="date"
              placeholder="Inicio do Periodo"
              className="input input-bordered input-primary w-full "
            />
          </div>

          <div>
            <label htmlFor="">Até</label>
            <input
              onChange={(e) => {
                setFinalDate(e.target.value);
              }}
              value={finalDate}
              type="date"
              placeholder="Final do Periodo"
              className="input input-bordered input-primary w-full "
            />
          </div>
        </div>
      </Filters>

      <header className="flex flex-col mb-5">
        <span>
          Total :{' '}
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(Number(data.sumPayments.payment_total))}
          </strong>
        </span>

        <span>
          Total com juros :{' '}
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(data.sumPayments.sum_payments_machine)}
          </strong>
        </span>

        <span>
          Total parcelado :{' '}
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(data.sumPayments.sumParcels)}
          </strong>
        </span>
      </header>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Pagamento</th>
              <th>Pagamento com Juros</th>
              <th>Parcela</th>
              <th>Tipo de Pagamento</th>
              <th>Plano</th>
              <th>Data do Pagamento</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {data?.paymentsNew.map((payment) => (
              <tr key={payment.id}>
                <th>{payment.id}</th>
                <td>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(payment.payment)}
                </td>
                <td>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(payment.payment_with_machine_interest)}
                </td>
                <td>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(
                    payment.payment_with_machine_interest /
                      payment.student.plan.amount_installments
                  )}
                </td>
                <td>{payment.type_payment}</td>
                <td>{payment.student.plan.name_plan}</td>
                <td>{moment(payment.created_at).format('DD-MM-YYYY')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};
export { Show };

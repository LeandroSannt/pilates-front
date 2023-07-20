import moment from 'moment';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { api } from '../../../../config/api';

import { Container } from './styles';

interface Payments {
  payment_with_machine_interest: number;
  payment: number;
  type_payment: string;
  created_at: string;
  id: number;
}

const Show: React.FC = () => {
  const { student_id } = useParams();

  const { data, isLoading } = useQuery<Payments[]>(
    ['payments', student_id],
    async () => {
      const response = await api.get(`/payment/${student_id}/students`);
      return response.data;
    }
  );

  console.log(data);

  return (
    <Container>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Pagamento</th>
              <th>Pagamento com Juros</th>
              <th>Tipo de Pagamento</th>
              <th>Data do Pagamento</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {data?.map((payment) => (
              <tr>
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
                <td>{payment.type_payment}</td>
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

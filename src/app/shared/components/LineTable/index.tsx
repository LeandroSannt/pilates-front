import moment from 'moment';
import React from 'react';
import { BiCake } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import Status from './status';
import { Container } from './styles';

interface LineProps {
  selectedStudentId: number;
  id: number;
  name: string;
  birth_date: string;
  typeTransaction: string;
  plan_expiration_day: string;
  status: string;
  planTotalMonths: number;
  currentMonthPlan: string;
  renovation(id: number): void;
  setTypeTransaction(type: string): void;
  expiration_date: string;
  day?: string;
  month?: string;
  plan?: string;
}

const LineTable: React.FC<LineProps> = ({
  renovation,
  setTypeTransaction,
  typeTransaction,
  expiration_date,
  selectedStudentId,
  birth_date,
  plan_expiration_day,
  id,
  name,
  status,
  planTotalMonths,
  day,
  month,
  plan,
}) => {
  const navigate = useNavigate();
  return (
    <Container>
      <div
        tabIndex={0}
        className="w-full flex justify-between flex-col  collapse collapse-arrow "
      >
        <div className=" flex justify-between collapse-title ">
          <div className="whitespace-nowrap">
            <p className="pontinhos">{name}</p>
          </div>
          <div>
            <span className="date response-none-620">
              <BiCake />
              <p>{day || month ? `${day} - ${month}` : 'Sem data'}</p>
            </span>

            <span className="date response-none-820 response-none-1200">
              <MdOutlineAttachMoney />
              <p>
                {plan_expiration_day
                  ? moment(plan_expiration_day).format('DD/MM/YYYY')
                  : 'Sem data'}
              </p>
            </span>

            <span className=" ml-0  whitespace-nowrap response-none-1200-active">
              {plan}
            </span>

            <span className="whitespace-nowrap response-none-1200">
              {Number(expiration_date) < 0
                ? 'Período invalido, atualize o vencimento do plano'
                : `${expiration_date} de ${planTotalMonths}`}
            </span>
            {/* response-none-476 mr-5  md:mr-0  */}
            <span className="mr-5  md:mr-0 ">
              <Status
                status={status === 'a vencer' ? 'aVencer' : (status as any)}
              />
            </span>

            <span className="response-none-1200 flex-col">
              <button
                onClick={() => {
                  renovation(id);
                }}
                // disabled={status !== 'vencido'}
                className=" btn btn-active btn-primary text-white transition btn-sm hover:bg-inherit hover:text-slate-500"
              >
                {typeTransaction && selectedStudentId === id
                  ? 'Confirmar'
                  : 'Confirmar Pagamento'}
              </button>

              {selectedStudentId === id && (
                <div className="flex items-center mt-2">
                  <label className="text-sm mr-2" htmlFor={id + 'pix'}>
                    <input
                      onChange={(e) => setTypeTransaction(e.target.value)}
                      className="mr-2"
                      id={id + 'pix'}
                      type="radio"
                      name="typePayment"
                      value={'pix'}
                    />
                    Pix
                  </label>

                  <label className="text-sm mr-2" htmlFor={id + 'debito'}>
                    <input
                      onChange={(e) => setTypeTransaction(e.target.value)}
                      className="mr-2"
                      id={id + 'debito'}
                      type="radio"
                      name="typePayment"
                      value={'debito'}
                    />
                    Debito
                  </label>

                  <label htmlFor={id + 'credito'}>
                    <input
                      onChange={(e) => setTypeTransaction(e.target.value)}
                      className="mr-2"
                      id={id + 'credito'}
                      type="radio"
                      name="typePayment"
                      value={'credito'}
                    />
                    Credito
                  </label>
                </div>
              )}
            </span>

            <span
              onClick={async () => {
                navigate(`${id}/edit`);
              }}
            >
              <FiEdit cursor={'pointer'} />
            </span>
          </div>
        </div>
        <div className="collapse-content">
          <div className=" w-full flex flex-col">
            <div className="w-full flex flex-col justify-start items-start">
              <span className="ml-0  mb-2 date response-none-620-active">
                <BiCake />

                <p>{day || month ? `${day} - ${month}` : 'Sem data'}</p>
              </span>

              <span className="ml-0  mb-2 date response-none-820-active response-none-1200-active">
                <MdOutlineAttachMoney />
                <p>
                  {plan_expiration_day
                    ? moment(plan_expiration_day).format('DD/MM/YYYY')
                    : 'Sem data'}
                </p>
              </span>

              <span className=" ml-0  mb-2 whitespace-nowrap response-none-1200-active">
                {plan}
              </span>

              <span className=" ml-0  mb-2 whitespace-nowrap response-none-1200-active">
                {expiration_date} de {planTotalMonths}
              </span>

              {/* <span className='ml-0 mb-2 response-none-476-active'>
            <Status status={status === 'a vencer' ? 'aVencer' : status as any}/>
            </span> */}
            </div>

            {/* <span className='response-none-1200-active' >
            <button onClick={() =>{renovation(id)}} className="btn btn-active btn-primary text-white transition btn-sm hover:bg-inherit hover:text-slate-500">Renovar plano</button>
          </span> */}
          </div>
        </div>
      </div>
    </Container>
  );
};
export default LineTable;

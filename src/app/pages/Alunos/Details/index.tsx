import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import * as Yup from 'yup';

import { api } from '../../../../config/api';
import { queryClient } from '../../../../config/query-Client';
import { Input } from '../../../shared/components/Form/Input/InputText';
import { TextArea } from '../../../shared/components/Form/TextArea/TextArea';
import { PlanProps, StudentProps } from '../../../shared/interfaces/students';
import getValidationErrors from '../../../shared/utils/getValidationErros';
import { popError } from '../../../shared/utils/popError';
import { popSucess } from '../../../shared/utils/popSuccess';
import { Container, GroupInput, InputBirthDate } from './styles';
import { monthsPerYear } from '../../../shared/utils/monthPerYear';

type FormData = {
  name: string;
  email: string;
  birthDate: string;
  telephone: string;
  telephoneEmergency: string;
  registration: string;
  plan_id: string;
  dataVencimento: string;
  objective: string;
  plan_expiration_day: number;
};

export interface PlanPeriod {
  startPeriod: string;
  endPeriod: string;
}
const Details: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const [student, setStudent] = useState<StudentProps>();
  const [daybirth, setDayBirth] = useState('');
  const [monthBird, setMonth] = useState('');
  const [planId, setPlanid] = useState('');

  const months = monthsPerYear();

  const [focusBirthDate, setFocusBirthDate] = useState(false);
  const { id } = useParams();

  const { isLoading } = useQuery<StudentProps>(
    ['student', id],
    async () => {
      if (id) {
        const response = await api.get(`/students/${id}`);
        return response.data;
      } else {
        return [];
      }
    },
    { onSuccess: (data: StudentProps) => setStudent(data) }
  );

  const { data: planPeriod } = useQuery<PlanPeriod>(
    ['planPeriod', planId],
    async () => {
      if (planId) {
        const response = await api.get(`/plans/${planId}/expiry-period`);
        return response.data;
      } else {
        return {};
      }
    }
  );

  useEffect(() => {
    if (student?.plan_id) setPlanid(student?.plan_id.toString());
    if (student?.day_birth) setDayBirth(student?.day_birth);
    if (student?.month_birth) setMonth(student?.month_birth);
  }, [student?.day_birth, student?.month_birth, student?.plan_id]);

  const createStudent = async (data: FormData) => {
    const response = await api.post('students/store-current-month', {
      ...data,
      day_birth: daybirth,
      month_birth: monthBird,
    });
    return response;
  };

  const updateStudant = async (data: FormData) => {
    const response = await api.put(`students/${id}`, {
      ...data,
      day_birth: daybirth,
      month_birth: monthBird,
    });

    await queryClient.invalidateQueries('student');
    await queryClient.invalidateQueries('students');
    return response;
  };

  const { data: plans } = useQuery<PlanProps[]>(['plans'], async () => {
    const response = await api.get('/plans');

    return response.data;
  });

  const handleSubmit = async (data: FormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome do aluno obrigatorio'),
        plan_id: Yup.string().required('Selecione um plano'),
        plan_expiration_day: Yup.string().required(
          'Selecione a data de vencimento'
        ),
      });

      await schema.validate(
        { ...data, plan_id: planId },
        {
          abortEarly: false,
        }
      );

      if (id) {
        await updateStudant({ ...data, plan_id: planId });
        Promise.all([
          await updateStudant({ ...data, plan_id: planId }),
          await queryClient.invalidateQueries('student'),
        ]);
      } else {
        await createStudent({ ...data, plan_id: planId });
        await queryClient.invalidateQueries('students');
      }

      popSucess('Aluno registrado com sucesso');

      navigate('/dashboard/alunos');
      await queryClient.invalidateQueries('students');
    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        popError('Preencha os campos obrigatorios');
        return;
      }

      popError(err.message);
    }
  };

  if (!planPeriod) {
    return (
      <div className="flex items-center justify-center mt-48">
        <SyncLoader color="#1fcab3" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-48">
        <SyncLoader color="#1fcab3" />
      </div>
    );
  }

  return (
    <Container>
      <Form
        ref={formRef}
        initialData={{
          ...student,
          date_start_plan: moment(student?.date_start_plan).format(
            'YYYY-MM-DD'
          ),
        }}
        onSubmit={handleSubmit}
      >
        <section className="mb-5">
          <div className=" flex justify-between items-center">
            <h2>Dados Pessoais</h2>
            {/* {id && 
            <div>
              <h6>Prontuario</h6>
              <File  name="arquivo" type="file" />
            </div>
            } */}
          </div>

          <div className="flex-col flex sm:grid-cols-3 sm:grid mt-5  grid-cols-3 gap-5">
            <GroupInput>
              <label htmlFor="name">Nome do Aluno *</label>
              <Input id="name" name="name" placeholder="Nome do aluno" />
            </GroupInput>

            <GroupInput>
              <label htmlFor="email">Email</label>
              <Input id="email" name="email" placeholder="Email" />
            </GroupInput>

            <div className="flex gap-5 w-full">
              <GroupInput className="w-full">
                <label htmlFor="">Dia e mês do anivesario</label>
                <div
                  className={`w-full input input-bordered input-primary flex items-center justify-center outline-none ${
                    focusBirthDate && '  ring-1 ring-green-500'
                  }`}
                >
                  <InputBirthDate
                    onChange={(e) => {
                      setDayBirth(e.target.value);
                    }}
                    onFocus={() => {
                      setFocusBirthDate(true);
                    }}
                    onBlur={() => setFocusBirthDate(false)}
                    id="birth_date"
                    name="day_birth"
                    placeholder="Dia do anivesario"
                    className=""
                    value={daybirth}
                    type={'text'}
                  />
                  <select
                    name="month_birth"
                    value={monthBird}
                    defaultValue={student?.month_birth}
                    onChange={(e) => {
                      setMonth(e.target.value);
                    }}
                    onFocus={() => {
                      setFocusBirthDate(true);
                    }}
                    onBlur={() => setFocusBirthDate(false)}
                    id="month_birth"
                    className="outline-none"
                  >
                    <option value="" disabled>
                      Escolha um mês
                    </option>
                    {months.map((month) => {
                      return (
                        <option key={month.value} value={month.month}>
                          {month.month}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </GroupInput>
            </div>
          </div>

          <div className="flex-col flex sm:grid-cols-2  mt-5  sm:grid grid-cols-2 gap-5">
            <GroupInput>
              <label htmlFor="telehone">Telefone</label>
              <Input name="telephone" placeholder="Telefone do aluno" />
            </GroupInput>

            <GroupInput>
              <label htmlFor="telephone_emergency">
                Telefone de emergencia
              </label>
              <Input
                id="telephone_emergency"
                name="telephone_emergency"
                placeholder="Telefone de emergencia"
              />
            </GroupInput>
          </div>
        </section>
        <section className="mb-5">
          <div className="flex justify-between ">
            <h2>Dados do Plano</h2>
          </div>

          <div className="flex-col flex sm:grid-cols-3 sm:grid mt-5  grid-cols-3 gap-5">
            <GroupInput>
              <label htmlFor="pla_id">Plano *</label>

              <select
                defaultValue={student?.plan_id}
                className={`select select-primary w-full`}
                value={planId}
                onChange={(e) => {
                  setPlanid(e.target.value);
                }}
              >
                <option value="" disabled>
                  Escolha um plano
                </option>
                {plans?.map((plan) => {
                  return (
                    <option key={plan.id} value={plan.id}>
                      {plan.name_plan}
                    </option>
                  );
                })}
              </select>
              {/* <Select id="plan_id" name={'plan_id'}>
                {plans?.map((plan) => {
                  return (
                    <option key={plan.id} value={plan.id}>
                      {plan.name_plan}
                    </option>
                  );
                })}
              </Select> */}
            </GroupInput>

            <GroupInput>
              <label htmlFor="plan_expiration_day">
                Dia do vencimento do plano *
              </label>
              <Input
                min={planPeriod.startPeriod}
                max={planPeriod.endPeriod}
                id="plan_expiration_day"
                type="date"
                name="plan_expiration_day"
                placeholder="Dia do vencimento"
              />
            </GroupInput>

            {/* {id && 
            <GroupInput>
              <label   htmlFor="pla_id">Dia do inicio do plano</label>
              <Input id="date_start_plan" min={1} max={31} type='date' name='date_start_plan' placeholder="Inicio do plano" />
            </GroupInput>
            } */}
          </div>
        </section>
        <section className="mb-5">
          <div className=" mb-5 flex justify-between items-center ">
            <h2>Objetivo do aluno</h2>
          </div>

          <TextArea name="objective" />
        </section>
        <div className="flex justify-between items-center cursor-pointer">
          <button className="btn text-white border-none  bg-secundary hover:bg-secundaryOpacity">
            {id ? 'ATUALIZAR ALUNO' : 'CADASTRAR ALUNO'}
          </button>
          <span
            onClick={() => {
              navigate('/dashboard/alunos');
            }}
          >
            Voltar
          </span>
        </div>
      </Form>
    </Container>
  );
};
export default Details;

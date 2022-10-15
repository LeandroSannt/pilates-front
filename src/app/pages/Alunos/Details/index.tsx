import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import moment from "moment";
import React, { useRef, useState } from 'react';
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import * as Yup from 'yup';

import { api } from "../../../../config/api";
import { queryClient } from "../../../../config/query-Client";
import { Input } from '../../../shared/components/Form/Input/InputText';
import Select from "../../../shared/components/Form/Select";
import { TextArea } from '../../../shared/components/Form/TextArea/TextArea';
import { PlanProps, StudentProps } from "../../../shared/interfaces/students";
import getValidationErrors from "../../../shared/utils/getValidationErros";
import { popError } from "../../../shared/utils/popError";
import { popSucess } from "../../../shared/utils/popSuccess";
import { Container, GroupInput } from './styles';

type FormData = {
  name: string,
  email: string,
  birthDate: string,
  telephone:string
  telephoneEmergency:string
  registration:string
  plan_id:string
  dataVencimento:string
  objective:string
  plan_expiration_day:number
};
const Details:React.FC = () =>{
  const formRef= useRef<FormHandles>(null)
  const navigate = useNavigate()


  const [student,setStudent] = useState<StudentProps>()
  const {id} = useParams()
  const {isFetching} = useQuery<StudentProps>('student', async () =>{
    if(id){
      const response = await api.get(`/students/${id}`)  
      return response.data
    }else{
      return []
    }
  }, { onSuccess: (data: StudentProps) => setStudent(data) })


  const createStudent = async (data:FormData) =>{
   const response = await api.post('students/store-current-month',data)
   return response
  }

  const updateStudant = async (data:FormData) =>{
    const response = await api.put(`students/${id}`,data)

    await queryClient.invalidateQueries('student')
    return response
   }

  const {data:plans} = useQuery<PlanProps[]>(['plans'], async () =>{
    const response = await api.get('/plans')  
  
    return response.data
  })
 
  const handleSubmit = async (data:FormData) =>{

    try{
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name:Yup.string().required('Nome do aluno obrigatorio'),
        plan_id:Yup.string().required('Selecione um plano'),
        registration:Yup.string().required('Matricula obrigatoria'),
        plan_expiration_day:Yup.string().required('Selecione entre 1 e 31')
        
      })

      await schema.validate(data,{
        abortEarly:false  
      })
      
      if(id){
        await updateStudant(data)
      }else{
        await createStudent(data)
      }

      popSucess('Aluno registrado com sucesso')
      navigate('/alunos')

    }catch(err:any){
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors);

        popError('Preencha os campos obrigatorios')
        return
      }
      
        popError(err.message)
    }
  }

  if(isFetching){
    return(
      <div className='flex items-center justify-center mt-48'>
        <SyncLoader  color='#1fcab3'/>
      </div>
    )
  }

  return(
    <Container>
      <Form ref={formRef} initialData={{...student,birth_date:moment(student?.birth_date).format('YYYY-MM-DD'),date_start_plan:moment(student?.date_start_plan).format('YYYY-MM-DD')}} onSubmit={handleSubmit}>
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
              <Input id="name" name='name' placeholder="Nome do aluno" />
            </GroupInput>

            <GroupInput>
              <label htmlFor="email">Email</label>
              <Input id="email" name='email' placeholder="Email" />
            </GroupInput>

            <GroupInput>
              <label  htmlFor="name">Data de anivesario</label>
              <Input id ="birth_date" name='birth_date' placeholder="data"  type={'text'}/>
            </GroupInput>
          </div>

          <div className="flex-col flex sm:grid-cols-2  mt-5  sm:grid grid-cols-2 gap-5">
            <GroupInput>
              <label htmlFor="telehone">Telefone</label>
              <Input name='telephone' placeholder="Telefone do aluno" />
            </GroupInput>

            <GroupInput>
              <label  htmlFor="telephone_emergency">Telefone de emergencia</label>
              <Input id ="telephone_emergency" name='telephone_emergency' placeholder="Telefone de emergencia" />
            </GroupInput>
          </div>

        </section>
        <section className="mb-5">
          <div className="flex justify-between ">
            <h2>Dados da Academia</h2>
          </div>

          <div className="flex-col flex sm:grid-cols-3 sm:grid mt-5  grid-cols-3 gap-5">
            <GroupInput>
              <label  htmlFor="registration">Matricula *</label>
              <Input id="registration" name='registration' placeholder="Matricula do aluno" />
            </GroupInput>

            <GroupInput>
              <label  htmlFor="pla_id">Plano *</label>
              <Select id="plan_id" name={"plan_id"} >
                {plans?.map((plan) =>{
                  return(
                    <option value={plan.id}>{plan.name_plan}</option>
                  )
                })}
              </Select>
            </GroupInput>
            
            <GroupInput>
              <label   htmlFor="pla_id">Dia do vencimento do plano *</label>
              <Input id="plan_expiration_day" min={1} max={31} type='date' name='plan_expiration_day' placeholder="Dia do vencimento" />
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

          <TextArea name='objective' />
        </section>
        <div className="flex justify-between items-center cursor-pointer">

        <button className="btn text-white border-none  bg-secundary hover:bg-secundaryOpacity">{id ?'ATUALIZAR ALUNO' : 'CADASTRAR ALUNO'}</button>
        <span onClick={() =>{navigate("/alunos")}}>Voltar</span>        
        </div>
      </Form>
    </Container>
  )
}
export default Details


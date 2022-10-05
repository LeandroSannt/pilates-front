import { FormHandles } from "@unform/core"
import { Form } from "@unform/web"
import React, { useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import SyncLoader from "react-spinners/SyncLoader"
import * as Yup from 'yup'

import { api } from '../../../config/api'
import { queryClient } from "../../../config/query-Client"
import { Input } from '../../shared/components/Form/Input/InputText'
import LineTablePlans from '../../shared/components/LineTablePlans'
import { DefaultModal } from '../../shared/components/modals/DefaultModal'
import { PlanProps } from '../../shared/interfaces/students'
import getValidationErrors from "../../shared/utils/getValidationErros"
import { popError } from "../../shared/utils/popError"
import { popSucess } from "../../shared/utils/popSuccess"
import { Container, Filters, Table, UpdatePlan } from './styles'

interface PlanData{
name_plan:string
value:number
amount_installments:number
}

const Planos:React.FC = () =>{
  const navigate = useNavigate()
  const [openModal,setOpenModal] = useState(false)
  const {id} = useParams()
  const formRef= useRef<FormHandles>(null)

  const [plan,setPlan] = useState<PlanProps>()

  const {data:plans,isFetching} = useQuery<PlanProps[]>(['plans'], async () =>{
    const response = await api.get('/plans')  
  
    return response.data
  })

  const {isFetching:isFetchignPlan} = useQuery<PlanProps>(['plan',id], async () =>{
    if(id){
      const response = await api.get(`/plans/${id}`)  

      return response.data
    }
    
  },{ onSuccess: (data: PlanProps) => 
    id && setPlan(data)
 })


  const updatePlan = async (data:PlanData):Promise<PlanProps> =>{
   const response =  await api.put(`plans/${id}`,data)
   await queryClient.invalidateQueries("plans")

   return response.data
  }

  const createPlan = async (data:PlanData) =>{
    const response = await api.post(`plans`,data)
    await queryClient.invalidateQueries("plans")

    return response.data
  }

  const handleSubmit = async (data:PlanData) =>{
    try{  
      
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name_plan:Yup.string().required('Nome do plano obrigatorio'),
        value:Yup.string().required('Valor obrigatorio'),
        amount_installments:Yup.string().required('Quantidade de meses obrigatorio'),
      })

      await schema.validate(data,{
        abortEarly:false  
      })

      if(id){
        await updatePlan(data)
        popSucess('Plano atualizado com sucesso')
        setOpenModal(false)
        navigate('/dashboard/planos')
        
      }else{
        await createPlan(data)
        popSucess('Plano registrado com sucesso')
        setOpenModal(false)
      }

    }catch(err){
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors);

        popError('Preencha os campos obrigatorios')
        return
      }
    }
  }

  return(
    <Container>
      <DefaultModal
        width="90%"
        margin="auto 0"
        isOpen={openModal}
        setIsOpen={() =>{setOpenModal(true)}}
        content={
          <div className='h-96 flex flex-col items-center' >
            <div className=' flex justify-between w-full'>
              <h1 className='text-center mb-5 w-full'>
                {!id ? 'Cadastra plano' : 'Atualizar plano'}
              </h1>
              <span onClick={() =>{
                setOpenModal(false)
                setTimeout(() =>{
                  navigate('/dashboard/planos')
                },300)
                }
                }><AiOutlineClose cursor={'pointer'}/></span>
            </div>

            <UpdatePlan>
              <Form ref={formRef} className='' initialData={id ? plan : []}  onSubmit={handleSubmit}>
                  {
                  isFetchignPlan ?  
                  <div className='flex items-center justify-center mt-32 mb-36'>
                    <SyncLoader  color='#1fcab3'/>
                  </div> 
                 :

                  <div>
                    <div className='alertMessage '>
                      <label htmlFor="" className="text-xs">Nome do plano</label>
                      <Input placeholder="Nome do plano" name='name_plan'/>
                    </div>

                    <div className='alertMessage '>
                      <label htmlFor="" className="text-xs">Valor do plano</label>
                      <Input placeholder="Valor do plano" type={'number'} name='value'/>
                    </div>

                    <div className='alertMessage '>
                      <label htmlFor="" className="text-xs">Quantidade de meses referentes ao plano</label>
                      <Input placeholder="Quantidade de meses" type={'number'} name='amount_installments'/>
                    </div>
                  </div>
                }
                <button type='submit' onClick={() =>{}} className="mt-5 btn text-white border-none   bg-secundary hover:bg-secundaryOpacity w-full">{'Salvar plano'}</button>
                
              </Form>
            </UpdatePlan>
          </div>
        }
      />
      <main>

      <Filters className=''>
        <div >
          <h1 className='font-bold text-xl'>Planos</h1>
        </div>

          <button onClick={() =>{
            navigate('/dashboard/planos')
            setOpenModal(true)
          }}
           className="btn text-white border-none  bg-secundary hover:bg-secundaryOpacity">CADASTRAR PLANO</button>
      </Filters>

      <Table>
        {isFetching ? 
        
        <div className='flex items-center justify-center mt-48'>
          <SyncLoader  color='#1fcab3'/>
        </div> 
        :  

        !!plans?.length ? 
        plans?.map((plan) =>{
            return(
              <LineTablePlans setOpenModal={setOpenModal} value={plan.value}  key={plan.id} updateDate={plan.updated_at} id={plan.id} name={plan.name_plan}/>
            )
          })
        :
        <div className='font-bold flex items-center justify-center mt-48'>
          <h1>Nenhum Aluno Encontrado</h1>
        </div> 
      }
      
      </Table>
      </main>

    </Container>
  )
}

export default Planos
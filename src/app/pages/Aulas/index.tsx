import { Form } from '@unform/web';
import pt from 'date-fns/locale/pt-BR';
import moment from 'moment';
import React, { useState } from "react";
import ReactDatePicker from 'react-datepicker';
import { AiOutlineClose } from 'react-icons/ai';
import { MdAdd, MdCheck, MdClose } from 'react-icons/md';
import { useQuery } from 'react-query';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { api } from '../../../config/api';
import { queryClient } from '../../../config/query-Client';
import SelectForm from '../../shared/components/Form/Select';
import { DefaultModal } from '../../shared/components/modals/DefaultModal';
import { StudentProps, StudentsAulasProps } from '../../shared/interfaces/students';
import { popError } from '../../shared/utils/popError';
import { popInfo } from '../../shared/utils/PopInfo';
import { popSucess } from '../../shared/utils/popSuccess';
import { Card, Container, ContentCard, CreateAula, ItemCard } from './styles';

import 'react-datepicker/dist/react-datepicker.css';

interface IAlunoProps{
  id:number
  name:string
  status:string
  type:string
  gang_id?:number
}


  interface DataProps{
    horario:string
    dia:string
  }

  interface selectProps{
    value:number
    label:string
  }

  interface IhandleGang{
    date?:string
    gang_id?:number
    observation?:string

  }


  interface CancelProps{
    type?:string
    active:boolean
  }

const Aulas:React.FC = () =>{
  const animatedComponents = makeAnimated();
  const [startDate, setStartDate] = useState(new Date());
  const [openRemarcacao, setOpenRemarcacao] = useState<CancelProps>({active:false});
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [aluno, setAluno] = useState<IAlunoProps>();
  const [aulaId, setAulaId] = useState<number | null>();
  const [sendAlunos,setSendAlunos] = useState<selectProps[]>([])
  const [alunoChangedByAula, setAlunoChangedByAula] = useState('')
  const [selectDayAula, setSelectDayAula] = useState('todos')
  const [gangProps, setHandleGangProps] = useState<IhandleGang>()





  //preciso marca no calendario o dia que não tem 5 alunos

  const {data:aulasAlunos} = useQuery<StudentsAulasProps[]>(['aulasAlunos',selectDayAula], async () =>{
    if(selectDayAula){

      const response = await api.get('/gangStudents/get-gang-students',{
        params:{
          day:selectDayAula
        }
      })  
      
      return response.data
    }
  })

  const {data:students} = useQuery<StudentProps[]>(['studentsNoPaginated'], async () =>{
    const response = await api.get('/students')  
  
    return response.data
  })

  const getAluno = (aluno:IAlunoProps) =>{
    setAluno(aluno)
    setOpenRemarcacao({ active:true})
  }

  const getAlunoSelected = (alunos:selectProps[]) =>{
    setSendAlunos(alunos)
  }

  const handleSubmit = async (data:DataProps) =>{
    try{

      const alunoIds = sendAlunos.map((aluno) =>{
        return aluno!.value
      })

      //post data, sendAlunos
      await api.post('/gangs/store-many',{
        day:data.dia,
        time:data.horario,
        student_id:alunoIds
      })  

      await queryClient.invalidateQueries("aulasAlunos")

      popSucess('Aula registrada com sucesso')
      setOpenModalCreate(false)
      setSendAlunos([])
    }catch(err:any){
      if(err.response){
        popInfo(err.response.data)
      }else{
        popError(err.message)
      }
    }
  }

  const addAlunoByAula = async (idAula:number,day:string,time:string)=>{

    try{
      if(!alunoChangedByAula){
        throw new Error('Selecione um aluno');
      }

      await api.post('/gangStudents/add-gang-students',{
        student_id:Number(alunoChangedByAula),
        gang_id:idAula,
      })  
      await queryClient.invalidateQueries("aulasAlunos")
      
      popSucess(`Aluno adicionado na turma de ${day}, ${time} horas`)
      setAulaId(null)

    }catch(err:any){
      popError(err.message)

    }
   
  }

  const deleteAlunoByAula = async (aulaId:number, studentId:number) => {
    await api.delete(`/gangStudents/delete-gang-students`,{
      data:{
        gang_id:aulaId,
        student_id:studentId
      }
    })
    
    await queryClient.invalidateQueries("aulasAlunos")

    popSucess(`Aluno removido`)


  }

  const gangIds = aulasAlunos?.map((gang) => gang.id)

  const handleGang = async () =>{

    if(!gangProps?.date){
      throw new Error('Selecione a data da falta');
    }

    let path = ''

    if(aluno?.type === 'reposicao'){
      path = 'exchanges'
 
    }else if(aluno?.type === 'falta'){
      path = 'gangLakes'
    }

    try{

      if((aluno?.type === 'reposicao' || aluno?.type === 'falta')){
        await api.post(`${path}`,{
          student_id:aluno?.id,
          gang_id:aluno?.gang_id,
          observation:gangProps?.observation,
          date_lacks:moment(gangProps?.date).format()
        })

      popSucess(`Falta para o aluno ${aluno?.name} registrada para o dia ${moment(gangProps?.date).format('DD/MM/YYYY')}`)

      }else{
        const result = await api.post('exchanges/update-cancel-gangs',{
          gang_ids:gangIds,
          observation:gangProps?.observation,
          date_lacks:moment(gangProps?.date).format()
        })
        console.log(result)

        popSucess(`Reposição marcada para todos os alunos de ${moment(gangProps?.date).format('DD/MM/YYYY')}`)
      }
      
      setOpenRemarcacao({active:false})

    }catch(err:any){
      popError(err.message)
    }

  }

  return(
    <Container>

      <DefaultModal
        width="90%"
        margin="auto 0"
        isOpen={openRemarcacao.active}
        setIsOpen={() =>{setOpenRemarcacao({active:true})}}
        content={
          <div className='h-96 flex flex-col items-end'>
            <div className=' flex justify-between w-full'>
              <h1 className='text-center mb-5'>
                {
                openRemarcacao.type === 'cancelamentos' ?
                'Selecione a data do cancelamento' 
                :
                `Selecione a data da ${aluno?.type === 'reposicao' ? 'reposicão' : 'falta'}`
                }
                </h1>
              <span onClick={() =>{setOpenRemarcacao({active:false})}}><AiOutlineClose cursor={'pointer'}/></span>
            </div>

            <div className='w-full'>
            <label htmlFor=""> 
            {openRemarcacao.type === 'cancelamentos' ? 'Data do cancelamento' :  'Data da falta'}
            </label>
            <ReactDatePicker
              locale={pt}
              className="input input-bordered input-primary w-full "
              selected={startDate}
              onChange={(date:any) => setHandleGangProps({...gangProps,date:date})}
            />
            </div>

            <div className='w-full mt-5'>
              <label htmlFor="">Motivo da falta</label>
              <textarea onChange={(e) =>setHandleGangProps({...gangProps,observation:e.target.value})} className=' w-full textarea textarea-primary' name="" id="" ></textarea>
            </div>
          
            <button onClick={handleGang} className=" ml-auto mt-5 btn text-white border-none  bg-secundary hover:bg-secundaryOpacity">
              {`REGISTRAR`}
            </button>

          </div>
        }
      />

      <DefaultModal
        width="90%"
        margin="auto 0"
        isOpen={openModalCreate}
        setIsOpen={() =>{setOpenModalCreate(true)}}
        content={
          <div className='h-96 flex flex-col items-center'>
            <div className=' flex justify-between w-full'>
              <h1 className='text-center mb-5'>
                Cadastar aula
              </h1>
              <span onClick={() =>{setOpenModalCreate(false)}}><AiOutlineClose cursor={'pointer'}/></span>
            </div>

            <CreateAula>
              <Form className=''  onSubmit={handleSubmit}>
                <div>

                <div className='flex justify-between gap-5 w-full'>

                  <div className='mb-5 w-full'>
                    <label htmlFor="">Horário</label>
                    <SelectForm name='horario'>
                      <option value="6"> 6 horas</option>
                      <option value="7"> 7 horas</option>
                      <option value="8"> 8 horas</option>
                      <option value="9"> 9 horas</option>
                      <option value="10"> 10 horas</option>
                      <option value="11"> 11 horas</option>
                    </SelectForm>

                  </div>

                  <div className='mb-5 w-full'>
                    <label htmlFor="">Dia</label>
                    <SelectForm name='dia'>
                      <option value="segunda">Segunda</option>
                      <option value="terca">Terça</option>
                      <option value="quarta">Quarta</option>
                      <option value="quinta">Quinta</option>
                      <option value="sexta">Sexta</option>
                    </SelectForm>
                  </div>
                </div>

                <div className='alertMessage mb-5'>
                  <label htmlFor="">Selecione os alunos</label>
                  <Select
                    maxMenuHeight={200}
                    onChange={(e) =>getAlunoSelected(e as any)}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    placeholder="Selecione 5 alunos"
                    isMulti
                    options={students?.map((student) =>{
                      return {
                        value:student.id,
                        label:student.name
                      }
                    })}
                    className=" select-primary"
                  />
                </div>

                </div>
                <button type='submit' onClick={() =>{setOpenModalCreate(true)}} className="mt-20 btn text-white border-none   bg-secundary hover:bg-secundaryOpacity w-full">CADASTRAR AULA</button>
                
              </Form>
            </CreateAula>
          </div>
        }
      />

      <h1 className='font-bold text-xl'>Aulas</h1>

      <header className='  my-5 flex md:items-center items-end justify-between '>
        <button onClick={() =>{setOpenModalCreate(true)}} className="btn text-white border-none  bg-secundary hover:bg-secundaryOpacity">CADASTRAR AULA</button>
        <div className='flex flex-col'>
          
          <button className='btn btn-outline btn-accent btn-sm '  onClick={() =>{setOpenRemarcacao({active:true,type:"cancelamentos"})}} >CANCELAR AULAS</button>

          <select onChange={(e) =>{setSelectDayAula(e.target.value)}} className='mt-5 select select-primary' name='dia'>
            <option value="todos">Todos</option>
            <option value="segunda">Segunda</option>
            <option value="terca">Terça</option>
            <option value="quarta">Quarta</option>
            <option value="quinta">Quinta</option>
            <option value="sexta">Sexta</option>
          </select>

        </div>
      </header>

        
        { !!aulasAlunos?.length ?
          <section className=" grid md:grid-cols-2 grid-cols-1 gap-5">{
            aulasAlunos?.map((aula) =>(
              <Card key={aula.id}>
                <h2>{aula.day.toLocaleUpperCase()} - {aula.time} Horas</h2>
                <ContentCard>
                  <button style={{marginLeft:"auto"}} className='btn btn-outline btn-accent btn-sm'  onClick={() =>{setOpenRemarcacao({active:true,type:"cancelamentos"})}} >CANCELAR AULA</button>
                  {aula.studentGang.map((aluno) =>(
                    <ItemCard className='md:text-lg text-sm' key={aluno.id}>
                    <p>{aluno.name}</p>
                    <p className='actions'>
                      <span onClick={() =>{
                        deleteAlunoByAula(aula.id,aluno.id)
                      }}>
                        <AiOutlineClose cursor={'pointer'} color="red"/>
                      </span>

                      <span onClick={() =>{
                        getAluno({...aluno,gang_id:aula.id,type:'reposicao'})
                      }}>
                        R
                      </span>
                      <span onClick={() =>{
                        getAluno({...aluno,gang_id:aula.id,type:'falta'})
                      }}>
                        F
                      </span>
                    </p>
                    </ItemCard>
                  ))}
                    
                  {(aula.studentGang?.length < 5 && aulaId !== aula.id ) && 
                    <div onClick={() =>{
                      setAulaId(aula.id)}} className='flex items-center mt-5  justify-center hover:scale-105 transition cursor-pointer'>
                      <MdAdd/>
                      Adicionar Aluno
                    </div>
                  }

                  {(aulaId === aula.id && !!aulaId)  &&
                    <ItemCard>
                    <select onChange={(e) =>{setAlunoChangedByAula(e.target.value)}} className='m-2 select select-sm select-primary w-full max-w-[300px] h-6' name='aluno'>
                    {students?.map((student) =>(
                      <option className={aula.id.toString()} value={student.id}>{student.name}</option>
                    ))}
                    </select>

                    <div className='actionsAddAluno'>
                      <MdCheck onClick={ () =>{addAlunoByAula(aula.id,aula.day,aula.time)}}/>
                      <MdClose onClick={() =>setAulaId(null)}/>
                    </div>
                    </ItemCard>
                  }

                </ContentCard>          
              </Card>
            ))}
          </section>

        :
        <div className='font-bold flex items-center justify-center mt-28  '>
          <h1>Nenhuma Aula Registrada</h1>
        </div> 
      
      }
    </Container>
  )
}
export default Aulas
import moment from 'moment'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { SyncLoader } from 'react-spinners'

import { api } from '../../../config/api'
import LineTable from '../../shared/components/LineTableFaltas'
import Pagination from '../../shared/components/Pagination'
import { GangLakePaginated, StudentProps } from '../../shared/interfaces/students'
import { Container, Filters, Table } from './styles'

interface FilterProps{
  student_id?:string
  date?:string
}

const Remarcacoes:React.FC = () =>{

  const [page,setPage] = useState<string | null | undefined>('/?page=1')
  const [filters,setFilters] = useState<FilterProps>()
  
  const {data:gangLake,isFetching} = useQuery<GangLakePaginated>(['gangLake',page,filters?.student_id,filters?.date], async () =>{
    const response = await api.get(`/gangLakes/listPaginated${page}`,{
      params:{
        student_id:filters?.student_id,
        date:filters?.date && moment(filters?.date).format()
      }  
    })  
    
    return response.data
  })

  const {data:students} = useQuery<StudentProps[]>(['students'], async () =>{
    const response = await api.get(`students`)  
    
    return response.data
  })

  const changePage = (type:'next' | 'previous') =>{
    if(type === 'next'){
      setPage(gangLake?.meta.next_page_url)
    }else{
      setPage(gangLake?.meta.previous_page_url)
    }
  }

  const studentName = students?.find((student) => student.id === Number(filters?.student_id))?.name

  return(
    <Container className='flex justify-between flex-col min-h-[500px]'>
      <div>
      <h1 className='font-bold text-xl'>Faltas</h1>
      <Filters>
        <div  className='sm:flex-row  flex-col  flex justify-between w-full'>
          <div className=' sm:flex-row  flex-col flex items-center'>
            <div className=' w-full'>
              <label htmlFor="">Aluno</label>
              <select onChange={(e) =>{setFilters({...filters,student_id:e.target.value})}} className="select select-primary w-full ">
                  <option value={'todos'}>Todos</option>
                  {students?.map((student) =>(
                    <option key={student.id} value={student.id}>{student.name}</option>
                  ))}
              </select>
            </div>
            <div className='w-full sm:ml-5'>
              <label htmlFor="">Data da falta</label>
              <input  onChange={(e) =>{setFilters({...filters,date:e.target.value})}} type="date" placeholder="Pesquisar aluno" className="input input-bordered input-primary w-full " />
            </div>
          </div>

          <div className='flex flex-row items-center '>
            <span>
              Total de faltas {filters?.student_id && `do aluno ${students?.find((student) => student.id === Number(filters.student_id))?.name}`}:
            </span>
            <strong className='ml-1'>
              {gangLake?.meta.total}
            </strong>
          </div>
        </div>
      </Filters>

      <Table>
        { isFetching ?

        <div className='overflow flex items-center justify-center mt-48'>
          <SyncLoader  color='#1fcab3'/>
        </div> 

        :

        !!gangLake?.data.length ? 
        gangLake?.data?.map((lake) =>(
          <LineTable key={lake.id} observation={lake.observation} dateLake={lake.date} name={lake.student.name}   gang={`${lake.gang.day} - ${lake.gang.time}`} />
        ))
          :
        <div className='font-bold flex items-center justify-center mt-48'>
          <h1>Nenhuma falta Encontrado</h1>
        </div> 
        }


      </Table>

      </div>

      <Pagination changePage={changePage} current_page={gangLake?.meta.current_page || 0} first_page={gangLake?.meta.first_page || 0} last_page={gangLake?.meta.last_page || 0} />


    </Container>
  )
}
export default Remarcacoes
import moment from 'moment';
import React from 'react';
import { AiOutlinePercentage } from 'react-icons/ai';
import { MdUpdate } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Container } from './styles';

interface LineProps{
  id:number
  name:string
  updateDate:string
  value:number
  percent:number
  setOpenModal(value:boolean):void
}

const LineTable:React.FC<LineProps> = ({setOpenModal,value,updateDate,id,name,percent}) =>{
  const navigate = useNavigate()
  return(
    <Container >
      <div className='whitespace-nowrap'>
        <p>{name}</p>
      </div>
      <div> 

      <span className='date'>
        <p>{percent}</p>
        <AiOutlinePercentage/>
      </span>

      <span className='date'>
        <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}</p>
      </span>

        <span className='date'>
          <MdUpdate/>
          <p>{moment(updateDate).format('DD/MM/YYYY')}</p>
        </span>

        <span>
          <button onClick={async () =>{
            navigate(`/planos/${id}`)
            setOpenModal(true)
            }} className="btn btn-active btn-primary text-white transition btn-sm hover:bg-inherit hover:text-slate-500">Atualizar plano</button>
        </span>

      </div>

    </Container>
  )
}
export default LineTable
import moment from 'moment';
import React from 'react';
import { BsTelephoneX } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';

import { ModalProps } from '../../../pages/Remarcacoes';
import { ExChangedProps } from '../../interfaces/students';
import { Container } from './styles';

interface LineProps{
  id:number
  name:string
  telephone:string
  exchange:ExChangedProps[] | undefined
  finishExchange(value:number):void
  setHasOpen(value:ModalProps):void
  itemId:number | undefined
  total_exchanges:string
}

const LineTable:React.FC<LineProps> = ({itemId,setHasOpen,finishExchange,total_exchanges,exchange,name,telephone}) =>{

  return(
    
    <Container >
      <div tabIndex={0} className="w-full flex justify-between flex-col  collapse collapse-arrow ">
        <div className=" flex justify-between collapse-title ">
          <div className=' flex justify-between  w-full whitespace-nowrap'>
            <p>{name}</p>
            
            <div className='flex date response-none-820 response-none-1200'>

              <div className='mr-5 date response-none-820 response-none-1200'>
                <BsTelephoneX className='mr-2'/>
                <p>{telephone}</p>
              </div>

              <div>
                <span className='mr-2'>
                  Total de reposições
                </span>
                <strong>{total_exchanges}</strong>
              </div>
            </div>
          </div>

        </div>
        <div className=" w-full "> 
          <div className={`${ !itemId && 'collapse-content' }      overflow-x-auto`}>
            <table className="table w-full min-w-[1100px]">
                <thead>
                <tr>
                  <th>Turma e Horario</th>
                  <th>Observação</th>
                  <th>Data da Falta</th>
                  <th className='text-center'>Data da Reposição</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {exchange?.map((item) =>(
                  <tr key={item.id}>
                  <th className='w-16'>{`${item.gang.day} - ${item.gang.time} Horas`}</th>
                  <td>{item.observation}</td>
                  <td>{moment(item.date_lacks).format('DD/MM/YYYY')}</td>

                  {item.id === itemId ? 
                  <td><input type="text" /></td>
                  :
                  <td className='text-center'> {item?.date_exchanges ? moment(item?.date_exchanges).format('DD/MM/YYYY') : '-'}  </td>
                  }
                  <td>
                    <div onClick ={() =>{finishExchange(item.id)}}  className="  btn text-white border-none  bg-secundary hover:bg-secundaryOpacity md:w-full w-24">CONCLUIR</div>
                  </td>
                  <td><FiEdit onClick={() =>{
                    setHasOpen({hasOpen:true,itemId:item.id})
                    }} cursor={'pointer'}/></td>
                </tr>
                ))}
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  )
}
export default LineTable
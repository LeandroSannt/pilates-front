import moment from 'moment';
import React from 'react';
import { BiCake } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import Status from './status';
import { Container } from './styles';

interface LineProps{
  id:number
  name:string
  birth_date:string
  plan_expiration_day:string
  status:string
  planTotalMonths:number
  currentMonthPlan:string
  renovation(value:number):void
  expiration_date:string
}

const LineTable:React.FC<LineProps> = ({renovation,expiration_date,birth_date,plan_expiration_day,id,name,status,planTotalMonths,currentMonthPlan}) =>{
  const navigate = useNavigate()


  return(
    
    <Container >
      <div tabIndex={0} className="w-full flex justify-between flex-col  collapse collapse-arrow ">
        <div className=" flex justify-between collapse-title ">
          <div className='whitespace-nowrap'>
            <p>{name}</p>
          </div>
          <div> 
            <span className='date response-none-620'>
              <BiCake/>
              <p>{birth_date ?  moment(birth_date).format('DD/MM') : 'Sem data'}</p>
            </span>

            <span className='date response-none-820 response-none-1200'>
              <MdOutlineAttachMoney/>
              <p>{plan_expiration_day ? moment(plan_expiration_day).format('DD/MM/YYYY') : 'Sem data'}</p>
            </span>

            <span className='whitespace-nowrap response-none-1200' >
              {expiration_date} de  {planTotalMonths}
            </span>
            {/* response-none-476 mr-5  md:mr-0  */}
            <span className='mr-5  md:mr-0 '>
            <Status status={status === 'a vencer' ? 'aVencer' : status as any}/>
            </span>
{/* 
            <span className='response-none-1200' >
              <button onClick={() =>{renovation(id)}} className="btn btn-active btn-primary text-white transition btn-sm hover:bg-inherit hover:text-slate-500">Renovar plano</button>
            </span> */}

            <span 
              onClick={async () =>{
                navigate(`${id}/edit`)
              }}>
              <FiEdit cursor={'pointer'} />
            </span>
          </div>
        </div>
        <div className="collapse-content"> 

        <div className=' w-full flex flex-col'>
          <div className='w-full flex flex-col justify-start items-start'>
 
            <span className='ml-0  mb-2 date response-none-620-active'>
              <BiCake/>

              <p> {birth_date ?  moment(birth_date).format('DD/MM') : 'Sem data'}</p>
            </span>

            <span className= 'ml-0  mb-2 date response-none-820-active response-none-1200-active'>
              <MdOutlineAttachMoney/>
              <p>{plan_expiration_day ? moment(plan_expiration_day).format('DD/MM/YYYY') : 'Sem data'}</p>
            </span>

            <span className=' ml-0  mb-2 whitespace-nowrap response-none-1200-active' >
              {expiration_date} de  {planTotalMonths}
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
  )
}
export default LineTable
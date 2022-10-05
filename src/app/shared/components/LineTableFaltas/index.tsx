import moment from 'moment';
import React from 'react';
import { MdDateRange } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Container } from './styles';

interface GangLakeProps{
  dateLake?:string
  name?:string
  observation?:string
  gang?:string
}

const LineTable:React.FC<GangLakeProps> = ({dateLake,gang,name,observation}) =>{
  const navigate = useNavigate()

  return(
    <Container >
      <div>
        <p>{name}</p>
      </div>

      <div> 
      <span className='date flex items-center'>
          <MdDateRange/>
          <p>{moment(dateLake).format('DD/MM/YYYY')}</p>
        </span>

      <span>
        {gang}
      </span>

      <p className='max-w-[250px] truncate ...'>
        {observation}
      </p>

        
      </div>

    </Container>
  )
}
export default LineTable
import React from 'react'

import { StatusContainer } from './styles'

interface IStatusProps{
  status:'ativo' | 'inativo' | 'vencido' | 'aVencer'

}
const Status:React.FC<IStatusProps> = ({status}) =>{
  return(
    <StatusContainer className='w-14 text-xs md:text-base  md:w-28 ' status={status}>
      {status === 'aVencer' ? 'a vencer' : status}
    </StatusContainer>
  )
}
export default Status
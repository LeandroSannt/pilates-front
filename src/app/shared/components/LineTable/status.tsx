import React from 'react'

import { StatusContainer } from './styles'

interface IStatusProps{
  status:'ativo' | 'inativo' | 'vencido' | 'aVencer'

}
const Status:React.FC<IStatusProps> = ({status}) =>{
  return(
    <StatusContainer status={status}>
      {status === 'aVencer' ? 'a vencer' : status}
    </StatusContainer>
  )
}
export default Status
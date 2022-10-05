import React from 'react'

import { StatusContainer } from './styles'

interface IStatusProps{
  status:'ativo' | 'inativo'

}
const Status:React.FC<IStatusProps> = ({status}) =>{
  return(
    <StatusContainer status={status}>
      {status}
    </StatusContainer>
  )
}
export default Status
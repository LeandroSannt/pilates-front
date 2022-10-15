import { Link } from "react-router-dom";
import styled from 'styled-components';

export const Container = styled.div`

width: 100%;
min-width: 600px;
height: 60px;
border-radius: 4px;
background-color: rgba(31, 202, 179, .4);
display: flex;
align-items: center;
padding: 20px;
justify-content: space-between;
transition: all 400ms;


@media (max-width: 620px) {

  font-size: 12px;
}

div{
  display: flex;
  align-items: center;
  gap: 20px;

  span{
    display: flex;
    align-items: center;
    svg{
      margin-right: 10px;
    }
  }

  span + span{
    margin-left: 15px;
  }
}

&+&{
  margin-top: 20px;
}



&:hover{
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  transform: translateX(10px);

  @media (max-width: 620px) {
    &:hover{
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
      transform: translateX(0px);
    }
  }
}



`

export const NavLink = styled(Link)`

` 


const statusVariations={
  ativo:{
    background:"rgba(31, 202, 179, .6)",
    color:'green'
  },
  inativo:{
    background:'rgba(202, 31, 62, .4)',
    color:'red'
  }
}


interface StatusProps{
  status :"ativo" | 'inativo'
}
export const StatusContainer = styled.div<StatusProps>`
width: 100px;
height: 30px;
background-color: blue;
border-radius: 8px;
display: flex;
align-items: center;
justify-content: center;

${(props) => statusVariations[props.status]}


`
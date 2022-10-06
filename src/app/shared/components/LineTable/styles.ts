import { Link } from "react-router-dom";
import styled from 'styled-components';

export const Container = styled.div`

width: 100%;
/* min-width: 1000px; */
border-radius: 4px;
background-color: rgba(31, 202, 179, .4);
display: flex;
align-items: center;
justify-content: space-between;
transition: all 400ms;
flex-direction: column;

div{
  display: flex;
  align-items: center;

  span{
    display: flex;
    align-items: center;
    svg{
      margin-right: 10px;
    }
  }

  span + span{
    margin-left: 15px;

    @media (max-width: 620px) {
      span{
        margin-left: 0 !important;
      }
    }
  }
}

  @media (max-width: 620px) {
      span + span{
        margin-left: 0 !important;
      }
    }

&+&{
  margin-top: 20px;
}


&:hover{
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  transform: translateX(10px);
}

@media (max-width: 620px) {
  &:hover{
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  transform: translateX(0px);
  }
}


@media (min-width: 1200px) {
  .collapse-title::after{
    display: none ;
  }

  .collapse-content{
    display: none;
  }

  
}


@media (max-width: 1200px) {
  .response-none-1200{
    display: none;
  }

}

@media (max-width: 620px) {
  .response-none-620{
    display: none;
  }

  font-size: 12px;
}

@media (max-width: 476px) {
  .response-none-476{
    display: none;
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
border-radius: 8px;
display: flex;
align-items: center;
justify-content: center;

${(props) => statusVariations[props.status]}


`
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



@media (max-width: 620px) {
  .pontinhos{
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

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
    color:'black'
  },
  vencido:{
    background:'rgba(242, 5, 5,.8)',
    color:'black'
  },
  aVencer:{
    background:'rgb(230, 222, 18)',
    color:'black'
  },
  inativo:{
    background:'rgb(195, 195, 195)',
    color:'black'
  }
}


interface StatusProps{
  status :"ativo" | 'inativo' | 'vencido' | 'aVencer'
}
export const StatusContainer = styled.div<StatusProps>`
height: 30px;
border-radius: 8px;
display: flex;
align-items: center;
justify-content: center;
/* border:solid black 1px; */
box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);

${(props) => statusVariations[props.status]}


`
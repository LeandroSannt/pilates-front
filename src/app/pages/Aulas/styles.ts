import styled from 'styled-components'

export const Container = styled.div`
header{

}

.cancelAulas{
  display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 14px;
    transition: all 200ms;
    margin-left: auto;
    margin: 20px 0;

    &:hover{
      color: red;
      font-weight: bold;
    }
  }
`

export const Card = styled.div`
  border-radius: 4px;

  h2{
    margin-bottom: 10px;
  }

`

export const ContentCard = styled.div`
  background-color: rgba(31,202,179,.4);
  min-height: 400px;
  border-radius: 4px;
  padding: 10px;


  button{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    transition: all 200ms;
    margin-left: auto;

    &:hover{
      color: red;
      font-weight: bold;
    }
  }
`


export const ItemCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(248 250 252 / var(--tw-bg-opacity));  border-radius: 8px;
  transition: all 200ms;

  /* &:hover{
    background-color: #1fcab3;
  } */

  .actionsAddAluno{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 70px;
    padding: 0 10px;

    svg{
      cursor: pointer;
    }
  }

  & + &{
    margin-top: 10px;
  }


  p{
    margin: 10px;
  }

  .actions{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80px;


    span:nth-child(1){
      width: 30px;
      height: 30px;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      background-color:green;
      color:#1fcab3;
      cursor: pointer;

    }

    span:nth-child(2){
      color: red;
      background:rgba(202, 31, 62, .5);
      width: 30px;
      height: 30px;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      color:'#1fcab3';
      cursor: pointer;

    }
  }
`

export const CreateAula = styled.div`
  width: 100%;

  .alertMessage{
  }

  .alertMessage:after{
    content:"⚠️ Selecione ate 5 alunos por aula";
    width: 100%;
    height: 10px;
    margin-left: auto;
    text-align: right;
    margin-top: 10px;
    font-size: 12px;
    color: red;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    
  }
  
`
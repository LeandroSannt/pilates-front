import styled from 'styled-components'

export const Container = styled.div`


.activeTurma{
    background: #00c2cb !important;
    color: #fff !important;
  }
`

export const Turma = styled.div`
  width: 100%;
  height: 40px;
  border:solid 1px #00c2cb;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  align-items: center;
  color: #00c2cb;

  transition: all 400ms;
  cursor: pointer;

  &:hover{
    background: #00c2cb;
    color: #fff;

  }



`

export const GroupInput = styled.div`

display: flex;
flex-direction: column;
align-items: flex-start;
width: 100%;

label{
  font-size: 12px;
  margin-bottom: 5px;
  font-weight: 400;
}
`

export const InputBirthDate = styled.input`
outline: none;
`
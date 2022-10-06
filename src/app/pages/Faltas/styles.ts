import styled from 'styled-components'

export const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
min-height: 73vh;
`

export const Filters = styled.div`
  display: flex;
  margin: 20px 0;
  align-items: flex-end;
  justify-content: space-between;

  width: 100%;

  >div{
    display: flex;
    gap: 20px;

    }
`

export const Table = styled.div`
    overflow: auto;


`
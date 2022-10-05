import styled, { css } from 'styled-components'

interface ContainerProps{
  activeCollapse:boolean
}
export const Container = styled.div<ContainerProps>`

margin-top: 40px;

.headercollapse{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #14213F;
  padding:0 24px;
  div{
    svg{
      transition: all 400ms;
      margin-left: 10px;
      cursor: pointer;
      ${props =>
        props.activeCollapse &&
        css`
          transform: rotate(180deg);
      `}
    }
  }
}
`

export const TableContainer = styled.div`
width: 100%;
min-height: 200px;
background: #FDFDFD;
box-shadow: 0px 0px 16px rgba(20, 33, 63, 0.24);
border-radius: 8px;
padding: 16px 0;


table {
    /* collapsed, because the bottom shadow on thead tr is hidden otherwise */
    border-collapse: collapse;
    width: 100%;
}
td,th {padding: .5em 1em;}

thead tr{
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  color: #424557;
  text-align: center;
  padding-bottom: 50px;
}

tbody{

  tr:nth-child(even){
    background-color: #9BA6B6;
  }

  tr:nth-child(odd){
    background-color:#C8CFDA;
  }

  td{
    text-align: center;
  }
}

th{ 
  background-color: inherit;
 }


tbody:before {
  line-height:.6em;
  content:".";
  color:white; /* bacground color */
  display:block;
}

`

export const Input = styled.div`
`

export const KeyControllContainer = styled.tr`
background-color: inherit !important;
`

import styled from 'styled-components'

export const Container = styled.div`
`


export const Content = styled.div`
background: #304056;
width: 100%;
padding: 16px 24px;
display: flex;
justify-content: space-between;
align-items: center;
border-radius: 8px;
min-height: 61px;

& + &{
  margin-top: 8px;
}

h5{
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color:  #F1F1F1;
}

>div{
  display: flex;
  justify-content: space-between;
  align-items: center;

  >div + div{
    margin-left: 30px;

  }



  svg{
    cursor: pointer;
    transition: all 200ms;

    &:hover{
      filter: brightness(.8);
    }
  }

}
`

export const ContainerPagination = styled.div`
width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 22.11px 0;
  margin-bottom: 0px;

  p {
    font-size: 14px;
    line-height: 21px;
    color: #454545;
  }

  div {
    display: flex;
    align-items: center;

    svg {
      color: #c4c4c4;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    span {
      width: 28px;
      height: 28px;
      margin: 0 12.75px;

      background: #006a5b;
      mix-blend-mode: normal;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
      border-radius: 45px;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 14px;
      color: #ffffff;
    }
  }
`
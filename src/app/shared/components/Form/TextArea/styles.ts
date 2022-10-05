import styled from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isField: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
`

export const Error =styled.div`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #f4ede8;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
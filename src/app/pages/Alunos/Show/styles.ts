import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Filters = styled.div`
  display: flex;
  margin: 20px 0;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;

  > div {
    display: flex;
    gap: 20px;

    @media (max-width: 620px) {
      display: flex;
      flex-direction: column;
      width: 100%;

      input {
        width: 100% !important;
      }
    }

    > div {
      @media (max-width: 620px) {
        display: flex;

        flex-direction: column;
        width: 100%;

        input {
          width: 100% !important;
        }
      }
    }
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

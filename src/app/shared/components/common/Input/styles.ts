//@ts-nocheck
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const Input = tw.input`
${({ $inputStyle }) => $inputStyle}
 h-full 
 shadow-inputShadow
 block 
 pl-11
 sm:text-sm 
 rounded-md
 outline-0
 py-4
text-textBlue400
bg-background
font-medium
`;
const Container = styled.div`

  
  svg {
    color: #687e9d !important;
  }
`;

export { Input, Container };


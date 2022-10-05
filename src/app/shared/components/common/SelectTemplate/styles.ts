import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const Span = tw.span`

`;
const boxButton = `
outline-none 
relative 
w-full 
h-full 
bg-white   
rounded-md 
shadow-sm 
pl-3 
pr-3 
py-2 
text-left 
cursor-default
`;
const boxOptions = `
absolute 
z-10 
mt-1 
bg-white 
shadow-lg 
max-h-60 
rounded-md 
py-1 
text-base 
ring-1 
ring-black 
ring-opacity-5 
overflow-auto 
focus:outline-none 
sm:text-sm
w-full
`;
const containerStyle = `
 relative 
 h-full 
 bg-white 
 rounded-md 
 shadow-inputShadow 
 pl-3 
 pr-3 
 py-1
 text-left 
 cursor-default 
 focus:outline-none 
 focus:ring-1 
 sm:text-sm
`;
const Container = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: #687e9d;
  }
`;
export { boxButton, boxOptions, Span, Container, containerStyle };

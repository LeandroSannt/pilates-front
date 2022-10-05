import tw from 'tailwind-styled-components';

const switchStyled = `
relative 
inline-flex 
items-center 
flex-shrink-0  
h-8 
w-[69px]
border-2 
border-transparent 
rounded-full 
cursor-pointer 
transition-colors 
ease-in-out 
duration-200 
focus:outline-none
`;
const Toggle = tw.span`
pointer-events-none 
inline-block 
ml-px 
h-[24px] 
w-[24px] 
rounded-full 
bg-white 
shadow 
transform 
ring-0 
transition 
ease-in-out 
duration-200
`;
export { Toggle, switchStyled };

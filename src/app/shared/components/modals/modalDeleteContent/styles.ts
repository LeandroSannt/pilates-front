import tw from 'tailwind-styled-components';

const Button = tw.button`
w-full
inline-flex 
justify-center 
rounded-md 
border 
border-transparent 
shadow-sm 
px-4 
py-3 
text-base 
font-bold  
bg-red800
sm:col-start-2
sm:text-sm
uppercase
hover:brightness-90
transition-all
`;
const CancelButton = tw.button`
uppercase
mt-3 
w-full 
inline-flex 
justify-center 
rounded-md 
border 
shadow-sm 
px-4
py-3 
text-base 
font-bold
bg-blue900
sm:mt-0 
sm:col-start-1 
sm:text-sm
hover:brightness-90
transition-all

`;
export { Button, CancelButton };


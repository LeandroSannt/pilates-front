import tw from 'tailwind-styled-components';

const Container = tw.button`
w-full
inline-flex
items-center
px-4  
py-3
border 
border-transparent 
text-base 
font-bold rounded-lg 
text-textBlue400 
bg-buttonWhite 
justify-center 
focus:outline-none 
focus:ring-2 
hover:border-textBlue400
transition-[all 200ms]
focus:ring-offset-2 
focus:ring-textBlue400
shadow-lg
btn
hover:brightness-90
`;
export { Container };

import tw from 'tailwind-styled-components';

const Container = tw.div`
flex
flex-col
items-center
justify-center
gap-4
`;
const Label = tw.label`
md:text-2xl
text-base
text-orange1
uppercase
font-bold
`;
export { Container, Label };

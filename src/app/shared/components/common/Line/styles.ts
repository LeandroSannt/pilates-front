// @ts-nocheck
import tw from 'tailwind-styled-components';
type TLine = { $styles: string };

const Container = tw.div<TLine>`

${({ $styles }) => $styles}
h-px
`;

export { Container };

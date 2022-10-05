import React, { InputHTMLAttributes } from 'react';

import { Container, Input } from './styles';

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  icon?: JSX.Element;
  inputStyle: string;
  defaultValue?: string;
  type?: string;
  name?: string
}
type TRef = HTMLInputElement;

const SearchInput = React.forwardRef<TRef, InputSearchProps>(
  ({ placeholder, icon, inputStyle, defaultValue, type, name, ...rest }, ref) => {
    return (
      <Container>
        <div className="outline-none relative rounded-md shadow-sm">
          <div className="outline-none absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
          <Input
            defaultValue={defaultValue}
            $inputStyle={inputStyle}
            type={type}
            className={'outline-hidden'}
            name={name}
            id="text"
            placeholder={placeholder}
            {...rest}
            ref={ref}
          />
        </div>
      </Container>
    );
  }
);

export default SearchInput;

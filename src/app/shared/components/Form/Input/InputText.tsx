import { useField } from '@unform/core';
import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: React.CSSProperties;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsField] = useState(false);
  const [isError, setIsError] = useState<string | undefined>('');
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() =>{
    setIsError(error)
  },[error])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    if(!!error){
      setIsError(undefined)
    }

    setIsField(!!inputRef.current?.value);
  }, [error]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isField={isField}
      isFocused={isFocused}
      data-testid="input-container"
    >
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        className={`input input-bordered ${isError ? 'input-accent placeholder:text-red-500' :'input-primary'}  w-full `}
        ref={inputRef}
        {...rest}
      />

      {isError && (
        <span className='mt-1 text-xs text-red-500'>{error}</span>
      )}
    </Container>
  );
};
export { Input };

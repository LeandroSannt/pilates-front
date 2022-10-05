/* eslint-disable react/jsx-props-no-spreading */
import { useField } from '@unform/core';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Container, Error } from './styles';

interface Props {
  name: string;
  label?: string;
  marginTop?: number;
}

export type BaseTextAreaProps = Props & JSX.IntrinsicElements['textarea'];

export  function TextArea({
  name,
  label,
  className,
  marginTop = 0,
  rows = 5,
  ...rest
}: BaseTextAreaProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsField] = useState(false);


  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsField(!!inputRef.current?.value);
  }, []);


  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => ref.current.value,
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: ref => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container 
    isErrored={!!error}
    isField={isField}
    isFocused={isFocused}
    style={{width:"100%"}} 
    className={className}

    >
      {label && <label htmlFor={fieldName}>{label}</label>}
      <textarea
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        className="textarea textarea-primary w-full"
        rows={rows}
        {...rest}

      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}

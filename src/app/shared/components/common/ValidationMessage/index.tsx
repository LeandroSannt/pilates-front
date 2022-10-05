import React from 'react';
import { FieldError } from 'react-hook-form';

interface IValidationMessagePRops {
  styles: string;
  errors?: FieldError | undefined;
}
const ValidationMessage: React.FC<IValidationMessagePRops> = ({
  styles,
  errors,
}) => {
  return (
    <>
      {errors && (
        <span className={`${styles} text-xs text-red-500 absolute ml-2`}>
          {errors.message}
        </span>
      )}
    </>
  );
};

export { ValidationMessage };

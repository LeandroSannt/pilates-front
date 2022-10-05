import * as yup from 'yup';

const usersSchema = yup.object().shape({
  role: yup
    .string()
    .required('Campo obrigatório!'),
  full_name: yup
    .string()
    .required('Campo obrigatório!'),
  email: yup
    .string()
    .required('Campo obrigatório!'),
});

export { usersSchema };


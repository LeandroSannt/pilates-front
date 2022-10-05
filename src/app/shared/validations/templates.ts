import * as yup from 'yup';

const templateSchema = yup.object().shape({
  name: yup
    .string()
    .required('Campo obrigatório!')
    .min(3, 'O campo deve ter no mínimo 3 caracteres')
    .max(35, 'o campo não pode ter mais de 35 caracteres'),
  order_username:yup
    .string()
    .required('Campo obrigatório!')
    .min(3, 'O campo deve ter no mínimo 3 caracteres')
    .max(35, 'o campo não pode ter mais de 35 caracteres'),
  
  return_layout:yup
    .string()
    .required('Campo obrigatório!')
    .min(3, 'O campo deve ter no mínimo 3 caracteres')
    .max(35, 'o campo não pode ter mais de 35 caracteres'),

  kind:yup
    .string()
    .required('Campo obrigatório!')
    .min(3, 'O campo deve ter no mínimo 3 caracteres')
    .max(35, 'o campo não pode ter mais de 35 caracteres'),
});

export { templateSchema };


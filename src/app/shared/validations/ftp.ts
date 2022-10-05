import * as yup from 'yup';

const ftpSchema = yup.object().shape({
  company_name: yup
    .string()
    .required('Campo obrigatório!')
    .min(3, 'O campo deve ter no mínimo 3 caracteres')
    .max(35, 'o campo não pode ter mais de 35 caracteres'),
});

export { ftpSchema };


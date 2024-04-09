import { FormGroup } from '@angular/forms';

export default function getErrorMessagesFromFormGroup(fields: string[], form: FormGroup): string | null {
  const fieldMapper = {
    email: 'Email',
    password: 'Senha',
    name: 'Nome',
    passwordConfirmation: 'Confirmar senha'
  };
  let errorTxt;

  for (const field of fields) {
    const error = form.get(field)?.errors;

    if (error) {
      const [type] = Object.keys(error);
      const errorMapper = {
        required: `${fieldMapper[field]} é obrigatório`,
        email: 'Digite um email válido'
      };

      errorTxt = errorMapper[type];
    }
  }

  return errorTxt;
}

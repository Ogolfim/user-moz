import { either } from 'fp-ts'
import isEmail from '../../services/isEmail'


const Email = (unvalidatedEmail: string): string | Error => {

  if(isEmail(unvalidatedEmail)) return unvalidatedEmail;

   new Error(`Ops! Email invalid`);
}

export default Email
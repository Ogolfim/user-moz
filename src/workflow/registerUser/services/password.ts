import bcrypt from 'bcrypt';
import * as TE from 'fp-ts/lib/TaskEither'
import { Password } from '../domain/requiredFields/Password';


export const genPassword = (password: Password): TE.TaskEither<Error, string> => {

  const hash =  TE.tryCatch(
    async () => {
      const salt = await bcrypt.genSalt(10)
      return bcrypt.hash(password, salt)
    },
    () => new Error('Ops! Hash não foi gerada')
  )

  return hash
}


export const isValidPassword = async (password: Password, hash: string) => {
  const result = await bcrypt.compare(password, hash);
  return result;
}

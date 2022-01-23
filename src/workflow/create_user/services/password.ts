import bcrypt from 'bcrypt';
import TE, { TaskEither } from 'fp-ts/TaskEither'
import { fail, HttpResponse } from '../../../core/infra/HttpResponse';
import { Password } from '../domain/requiredFields/Password';

const hashError = new Error()
hashError.name = "hashPasswordError"

export const genPassword = (password: Password): TaskEither<HttpResponse, string> => {
  return TE.tryCatch(
    async () => {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      return hash
    },
    () => fail(hashError)
  )
}

export const isValidPassword = async (password: Password, hash: string) => {
  const result = await bcrypt.compare(password, hash);
  return result;
}

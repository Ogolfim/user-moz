import bcrypt from 'bcrypt';
import TE, { TaskEither } from 'fp-ts/TaskEither'
import { fail, HttpResponse } from '../../../core/infra/HttpResponse';

const hashError = new Error()
hashError.name = "hashPasswordError"

export const genPassword = (password: string): TaskEither<HttpResponse, string> => {
  return TE.tryCatch(
    async () => {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      return hash
    },
    () => fail(hashError)
  )
}

export const isValidPassword = async (password: string, hash: string) => {
  const result = await bcrypt.compare(password, hash);
  return result;
}

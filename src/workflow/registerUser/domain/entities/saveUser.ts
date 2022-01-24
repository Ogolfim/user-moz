import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { prisma } from "../../../../infra/prisma/client";
import { genPassword } from '../../services/password';
import { User } from "../requiredFields/User";

 
export const saveUser = async (user: User): Promise<E.Either<Error, User>> => {
  const { name, email, password } = user

  const save =  TE.tryCatch(
    
    async () => {
      console.log([8383])
      const user = await prisma.users.findUnique({
        where: { email },
        select: { email: true }
      }) 

      if(user) return new Error(`Ops! Email ${email} já tem conta`)

      const hash = await genPassword(password)

      return prisma.users.create({
        data: {
          name,
          password: hash,
          email
        },
        select: {}
      }) 
    },

    (error) => error as Error
  )

  const newUser = await pipe(
    save,
    TE.mapLeft(error => error),
    TE.map(() => user)
  )()
  
  return newUser
}

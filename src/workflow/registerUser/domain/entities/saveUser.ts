import * as TE from 'fp-ts/lib/TaskEither'
import { prisma } from "../../../../infra/prisma/client";
import { genPassword } from '../../services/password';
import { User } from "../requiredFields/User";
import { UserSchema } from '../../../../infra/prisma/schemas';
 
export const saveUser =  (user: User): TE.TaskEither<Error, UserSchema> => {
  const { name, email, password } = user

  const newUser =  TE.tryCatch(
    
    async () => {

      const user = await prisma.users.findUnique({
        where: { email },
        select: { email: true }
      }) 

      if(user) {
        throw new Error(`Ops! Email ${email} já tem conta`)
      }

      const hash = await genPassword(password)

      return prisma.users.create({
        data: {
          name,
          password: hash,
          email
        }
      }) 
    },

    (error) => error as Error
  )
  
  return newUser
}

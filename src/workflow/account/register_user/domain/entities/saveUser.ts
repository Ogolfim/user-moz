import * as TE from 'fp-ts/lib/TaskEither'
import { prisma } from "../../../infra/prisma/client";
import { UserSchema } from '../../../infra/prisma/schemas';
import { hashPassword } from '../../services/hash_password';
import { User } from '../requiredFields/User';

 
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

      const hash = await hashPassword(password)

      return prisma.users.create({
        data: {
          name,
          hash,
          email
        }
      }) 
    },

    (error) => error as Error
  )
  
  return newUser
}

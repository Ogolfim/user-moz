import * as TE from 'fp-ts/lib/TaskEither'
import { prisma } from "../../infra/prisma/client";
import { UserSaver } from '../contracts/UserSaver';

 
export const userSaver: UserSaver =  ({ name, email, hash }) => {

  const newUser =  TE.tryCatch(
    
    async () => {

      const user = await prisma.users.findUnique({
        where: { email },
        select: { email: true }
      }) 

      if(user) {
        throw new Error(`Ops! Email ${email} já tem conta`)
      }

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

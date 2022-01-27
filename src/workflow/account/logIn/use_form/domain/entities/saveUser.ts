import * as TE from 'fp-ts/lib/TaskEither'
import { prisma } from "../../../../infra/prisma/client";
import { FindUser } from '../contracts/FindUser';

 
export const findUser: FindUser =  (email) => {

  const user =  TE.tryCatch(
    
    async () => {

      const user = await prisma.users.findUnique({
        where: { email },
      }) 

      if(!user) {
        throw new Error(`Ops! Usuário não encontrado`)
      }

      return user
    },

    (error) => error as Error
  )
  
  return user
}

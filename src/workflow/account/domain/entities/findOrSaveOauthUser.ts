import * as TE from 'fp-ts/lib/TaskEither'
import { prisma } from "../../infra/prisma/client"
import { FindOrSaveUser } from '../contracts/FindOrSaveUser'

 
export const findOrSaveUser: FindOrSaveUser =  ({ name, email, serverName }) => {

  const user =  TE.tryCatch(
    
    async () => {

      const user = await prisma.users.findUnique({
        where: { email }
      }) 

      if(user) {
        return user
      }

      return prisma.users.create({
        data: {
          name,
          serverName,
          email
        }
      }) 
    },

    (error) => error as Error
  )
  
  return user
}

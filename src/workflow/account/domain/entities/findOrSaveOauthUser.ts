import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '../../../../core/infra/HttpErrorResponse'
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

      return await prisma.users.create({
        data: {
          name,
          serverName,
          email
        }
      }) 
    },

    (error) => {
      console.log(error)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )
  
  return user
}

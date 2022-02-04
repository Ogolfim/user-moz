import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '../../../../core/infra/HttpErrorResponse';
import { prisma } from "../../infra/prisma/client";
import { FindAdminById } from '../contracts/FindAdminById';

 
export const findAdminById: FindAdminById =  (id) => {

  const admin =  TE.tryCatch(
    
    async () => {

      const admin = await prisma.meAdmin.findUnique({
        where: { id },
      }) 

      return admin
    },

    (err) => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )
  
  return admin
}

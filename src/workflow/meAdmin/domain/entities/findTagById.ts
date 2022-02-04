import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '../../../../core/infra/HttpErrorResponse';
import { prisma } from "../../infra/prisma/client";
import { FindTagById } from '../contracts/findTagById';

 
export const findTagById: FindTagById =  (id) => {

  const tag =  TE.tryCatch(
    
    async () => {

      const tag = await prisma.tags.findUnique({
        where: { id },
      }) 

      return tag
    },

    (err) => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )
  
  return tag
}

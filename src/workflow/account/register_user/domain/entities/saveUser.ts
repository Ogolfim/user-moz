import * as TE from 'fp-ts/lib/TaskEither'
import { prisma } from "../../../infra/prisma/client";
import { hashPassword } from '../../services/hash_password';
import { SaveUser } from '../contracts/SaveUser';

 
export const saveUser: SaveUser =  ({ name, email, password }) => {

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

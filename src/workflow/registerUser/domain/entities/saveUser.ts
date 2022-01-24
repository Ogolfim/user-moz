import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { prisma } from "../../../../infra/prisma/client";
import { User } from "../requiredFields/User";
import { findUserByEmail } from './findUserByEmail';

 
export const saveUser = (user: User): TE.TaskEither<Error, User> => {
  const { name, email, password } = user

  const save =  TE.tryCatch(
    
    async () => {
      return prisma.users.create({
        data: {
          name,
          password,
          email
        },
        select: {}
      }) 
    },

    () => new Error('Ops! Usuário não foi salvo')
  )


  const Usr = pipe(
    email,
    findUserByEmail,
    E.mapLeft(userFound => Error(`Ops! Email ${userFound.email} já tem conta`))
  )

  if(E.isRight(Usr)) {

    const newUser = pipe(
      save,
      TE.mapLeft(error => error),
      TE.map(() => user)
    )
    return newUser

  } else  {
    const tda = (): TE.TaskEither<Error, User> => {

      const save =  TE.tryCatch(
    
        async () => {
          return prisma.users.create({
            data: {
              name,
              password,
              email
            },
            select: {}
          }) 
        },
    
        () => new Error('Ops! Usuário não foi salvo')
      )

      return [
        
      ]
    }
  }
}

import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { prisma } from "../../../../infra/prisma/client";
import { Email } from '../requiredFields/Email';

type NoUser = null

type UserFound = {
  email: Email
}
 

export const findUserByEmail = (email: Email): E.Either<UserFound, NoUser> => {
  const user = new IsUserFound(email)

  if(user.is === true) {
    return  {
      _tag: 'Left',
      left: { email }
    }
    
  }

  return {
    _tag: 'Right',
    right: null
  }
}


class IsUserFound {

  constructor(email: Email) {
    pipe(
      email,
      findUser,
      TE.map(user => {
        if(user) {
          return this.is = true
        }

        return this.is = false
      })
    )
  }

  is = false
}



const findUser = (email: Email): TE.TaskEither<Error, UserFound | null> => {

  const find =  TE.tryCatch(
    
    async () => {
      return prisma.users.findUnique({
        where: { email },
        select: { email: true }
      }) 
    },

    () => new Error('Ops! Erro procurando usuário')
  )
  

  const user = pipe(
    find,
    TE.mapLeft(error => error),
    TE.map(user => {
      if(user) return { email }

      return null
    })
  )

  return user
}

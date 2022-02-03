import * as TE from 'fp-ts/TaskEither'
import { pipe } from "fp-ts/lib/function";
import { findUserById } from "./findUserById";
import { AddUserToTags } from '../contracts/AddUserToTags';
import { clientError, fail } from '../../../../core/infra/HttpErrorResponse';
import { prisma } from '../../infra/prisma/client';

export const addUserToTags: AddUserToTags =  ({ userId, tags }) => {

  const user = pipe(
    userId,
    findUserById,
    TE.chain(user => {
      return TE.tryCatch(
        async () => {
          if (!user) {
            throw new Error(`Oops! Usuário não encontrado`);
          }

          return user;
        },

        userFoundError => clientError(userFoundError as Error)
      )
    }),

    TE.chain((user) => TE.tryCatch(
      async () => {
        tags.map( async tag => {
          await prisma.tag_user.create({
            data: {
              user: {
                connect: {
                  id: user.id
                }
              },
              tag: {
                connect: {
                  id: tag.id
                }
              }
            }
          }) 
        })

        return user
      },
  
      (err) => {
        console.log(err)
        return fail(new Error('Oops! A sua conta não foi criada. Contacte suporte'))
      }
    ))
  )
  
  return user
}

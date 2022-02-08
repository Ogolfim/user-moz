import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'
import { clientError, fail } from '../../../../../core/infra/http_error_response'
import { prisma } from '../../../infra/prisma/client'
import { CreateAdminDB } from '../../contracts/createAdmin/create_admin'
import { findAdminByEmailDB } from '../findAdmin/find_admin_by_email'

export const createAdminDB: CreateAdminDB = ({ name, email, hash }) => {
  const newAdmin = pipe(
    email,
    findAdminByEmailDB,
    TE.chain(admin => {
      return TE.tryCatch(
        async () => {
          if (admin) {
            throw new Error(`Oops! Já existe uma conta com o email ${email}`)
          }

          return { name, email, hash }
        },

        userFoundError => clientError(userFoundError as Error)
      )
    }),

    TE.chain(() => TE.tryCatch(
      async () => {
        return prisma.meAdmin.create({
          data: {
            name,
            hash,
            email
          }
        })
      },

      (err) => {
        console.log(err)
        return fail(new Error('Oops! Erro. Por favor contacte suporte'))
      }
    ))
  )

  return newAdmin
}

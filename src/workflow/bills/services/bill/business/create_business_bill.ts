import * as TE from 'fp-ts/lib/TaskEither'
import { clientError, fail } from '@core/infra/http_error_response'
import { CreateBusinessBillService } from '@bills/domain/Contracts/Business/CreateBusinessBill'
import { pipe } from 'fp-ts/lib/function'
import { DatabaseFailError, EntityNotFoundError } from '@bills/domain/entities/errors/db_error'
import { UUID } from 'io-ts-types'

export const createBusinessBillService: CreateBusinessBillService = (createBusinessBillDB) => (findBusinessByAdminIdDB) => (validBill) => {
  return pipe(
    TE.tryCatch(
      async () => await findBusinessByAdminIdDB(validBill.userId),

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ),
    TE.chain(business => {
      return TE.tryCatch(
        async () => {
          if (!business) {
            throw new EntityNotFoundError('Oops! A sua conta não foi encontrada')
          }

          return business
        },

        err => clientError(err as Error)
      )
    }),
    TE.chain(business => {
      const IBill = {
        ...validBill,
        businessId: business.id as UUID
      }

      return TE.tryCatch(
        async () => await createBusinessBillDB(IBill),
        err => {
          console.log(err)
          return fail(new Error('Oops! Erro. Por favor contacte suporte'))
        }
      )
    })
  )
}

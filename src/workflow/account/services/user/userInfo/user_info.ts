import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { getUserInfoService } from '@account/domain/contracts/User/UserInfo/user_info'
import { DatabaseFailError } from '@account/domain/entities/errors/db_error'

export const userInfoService: getUserInfoService = (getUserInfoDB) => (userId) => {
  return TE.tryCatch(
    async () => await getUserInfoDB(userId),

    (err) => {
      console.log(err)
      return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
    }
  )
}

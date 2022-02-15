import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { UserInfoService } from '@account/domain/contracts/User/UserInfo/user_info'

export const userInfoService: UserInfoService = (userInfoDB) => (userId) => {
  return TE.tryCatch(
    async () => await userInfoDB(userId),

    (err) => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )
}

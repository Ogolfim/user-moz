import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { CreateCompanyInfoValidator } from '@account/domain/contracts/User/UserInfo/CreateCompanyInfo'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { CreateCompanyInfoPropsCodec } from '@account/domain/requiredFields/Users/create_company_info'

export const createCompanyInfoPropsValidate: CreateCompanyInfoValidator = (data) => {
  return pipe(
    E.tryCatch(
      () => {
        if (!data) throw new ValidationError('Oops! Você não forneceu nenhum dado')

        return data
      },

      (err) => err as ValidationError
    ),
    E.chain(data => pipe(
      data,
      CreateCompanyInfoPropsCodec.decode,
      E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
    ))
  )
}

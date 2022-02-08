import * as E from 'fp-ts/lib/Either'
import { UUID } from 'io-ts-types'
import { ValidationError } from '@account/services/validate/errors/validation_error'

export type UserPerfilPropsValidate = (id: string) => E.Either<ValidationError, UUID>

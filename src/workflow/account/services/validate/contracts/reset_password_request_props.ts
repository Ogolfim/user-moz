import { Email } from '@account/domain/requiredFields/email'
import * as E from 'fp-ts/lib/Either'
import { ValidationError } from '../errors/validation_error'

export type ResetPasswordRequestPropsValidate = (data: Email) => E.Either<ValidationError, Email>

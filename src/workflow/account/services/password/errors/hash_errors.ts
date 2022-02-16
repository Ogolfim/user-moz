import { DomainError } from '@core/domain/errors/domain_error'

export class PasswordHashError extends Error implements DomainError {
  constructor (message: string) {
    super(message)
    this.name = 'PasswordHash'
  }
}

export class PasswordVerifyError extends Error implements DomainError {
  constructor (message: string) {
    super(message)
    this.name = 'PasswordVerify'
  }
}

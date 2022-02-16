import { DomainError } from '@core/domain/errors/domain_error'

export class DatabaseFailError extends Error implements DomainError {
  constructor (message: string) {
    super(message)
    this.name = 'DatabaseFailed'
  }
}

export class EntityNotFoundError extends Error implements DomainError {
  constructor (message: string) {
    super(message)
    this.name = 'EntityNotFound'
  }
}

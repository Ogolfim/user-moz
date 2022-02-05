import { DomainError } from '@core/domain/errors/DomainError'

export class ValidationError extends Error implements DomainError {
  constructor (message: string) {
    super(message)
    this.name = 'InvalidField'
  }
}

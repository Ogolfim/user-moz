import { Password } from '../../../domain/requiredFields/password'

export type HashPassword = (password: Password) => Promise<string>

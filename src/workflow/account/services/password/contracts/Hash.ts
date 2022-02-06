import { Password } from '../../../domain/requiredFields/Password'

export type HashPassword = (password: Password) => Promise<string>

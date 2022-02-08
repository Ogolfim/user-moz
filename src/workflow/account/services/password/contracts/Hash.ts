import { Password } from '@account/domain/requiredFields/password'

export type HashPassword = (password: Password) => Promise<string>

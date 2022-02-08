import { Password } from '@meAdmin/domain/requiredFields/password'

export type HashPassword = (password: Password) => Promise<string>

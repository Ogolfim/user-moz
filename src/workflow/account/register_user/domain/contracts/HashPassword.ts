import { Password } from '../requiredFields/Password'


export type HashPassword = (password: Password) => Promise<string>
import { UUID } from 'io-ts-types'

export type CreateAccessToken = (userId: UUID) => string

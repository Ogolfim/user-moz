import { RefreshTokenSchema } from '../../infra/prisma/schemas'

export type CreateRefreshAccessToken = (user: RefreshTokenSchema) => string

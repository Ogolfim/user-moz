import { RefreshTokenSchema } from '@account/infra/prisma/schemas'

export type CreateRefreshAccessToken = (user: RefreshTokenSchema) => string

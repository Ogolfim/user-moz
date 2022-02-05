import { AdminSchema } from '../../infra/prisma/schemas'

export type CreateAccessToken = (admin: AdminSchema) => string

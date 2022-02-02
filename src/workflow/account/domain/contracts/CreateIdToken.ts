import { UserSchema } from "../../infra/prisma/schemas";

export type CreateAccessToken = (user: UserSchema) => string

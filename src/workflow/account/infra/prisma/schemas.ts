import { Tag, User, UserRefreshToken, UserService } from '@prisma/client'

export type UserSchema = User
export type ServiceSchema = UserService

export type RefreshTokenSchema = UserRefreshToken

export type TagSchema = Tag

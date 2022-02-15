import { Tag, User, UserRefreshToken, Bill, Payment } from '@prisma/client'

export type UserSchema = User

export type RefreshTokenSchema = UserRefreshToken

export type TagSchema = Tag

export type BillSchema = Bill
export type PaymentSchema = Payment

export type ServiceSchema = {
  api: string
  webDownload: string
}

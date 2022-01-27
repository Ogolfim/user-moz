interface CreateAccessTokenUser {
  id: string
}

export type CreateAccessToken = (user: CreateAccessTokenUser) => string

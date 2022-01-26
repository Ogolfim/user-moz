import { sign } from "jsonwebtoken";


interface CreateAccessTokenUser {
  id: string
}

interface createRefreshToken extends CreateAccessTokenUser {
  token_version: number
}

export const createAccessToken = ({ id }: CreateAccessTokenUser): string => {
  return sign(
    { id }, 
    process.env.ACCESS_TOKEN_SECRET!,
    {expiresIn: '20m'}
  )
}

export const createRefreshToken = ({ id, token_version }: createRefreshToken): string => {
  return sign(
    { id, token_version }, 
    process.env.REFRESH_TOKEN_SECRET!,
    {expiresIn: '7d'}
  )
}
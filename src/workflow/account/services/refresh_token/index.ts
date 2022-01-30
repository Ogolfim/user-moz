interface createRefreshToken {
  id: string
  token_version: number
}

export const createRefreshToken = ({ id, token_version }: createRefreshToken): string => {
  return sign(
    { id, token_version }, 
    process.env.REFRESH_TOKEN_SECRET!,
    {expiresIn: '7d'}
  )
}
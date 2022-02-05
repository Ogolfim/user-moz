import { sign } from 'jsonwebtoken'
import { CreateRefreshAccessToken } from '../../domain/contracts/CreateRefreshAccessToken'

export const createRefreshAccessToken: CreateRefreshAccessToken = ({ id, userId, expiresIn }) => {
  return sign(
    { id },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      subject: userId,
      expiresIn: expiresIn
    }
  )
}

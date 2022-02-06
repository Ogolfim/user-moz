import dayjs from 'dayjs'
import { sign } from 'jsonwebtoken'
import { CreateRefreshAccessToken } from '../../domain/contracts/CreateRefreshAccessToken'

export const createRefreshAccessToken: CreateRefreshAccessToken = ({ id, userId, expiresIn }) => {
  const time = dayjs().add(2, 'days').unix()

  return sign(
    { id },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      subject: userId,
      expiresIn: expiresIn
    }
  )
}

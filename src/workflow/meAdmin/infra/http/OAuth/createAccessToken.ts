import { sign } from 'jsonwebtoken'
import { CreateAccessToken } from '../../../domain/contracts/CreateAccessToken'

export const createAccessToken: CreateAccessToken = ({ id }) => {
  return sign(
    {},
    process.env.ACCESS_TOKEN_SECRET!,
    {
      subject: id,
      expiresIn: '10m'
    }
  )
}

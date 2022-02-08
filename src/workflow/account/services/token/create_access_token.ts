import { sign } from 'jsonwebtoken'
import { CreateAccessToken } from '@account/services/token/contracts/create_access_token'

export const createAccessToken: CreateAccessToken = ({ id, services }) => {
  return sign(
    {
      download: services.webDownload,
      api: services.apiAccess
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      subject: id,
      expiresIn: '10m'
    }
  )
}

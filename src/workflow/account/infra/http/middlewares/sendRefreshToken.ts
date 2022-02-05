import { Response } from 'express'

export const sendRefreshToken = (response: Response, token: string) => {
  return response.cookie('bb', token, { httpOnly: true })
}

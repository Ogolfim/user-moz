import { Response } from 'express'

export const sendToken = (response: Response, token: string) => {
  return response.cookie('bb', token, { httpOnly: true })
}

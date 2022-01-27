import { sign } from "jsonwebtoken"
import { CreateAccessToken } from "../domain/user_cases/CreateIdToken"


export const createAccessToken: CreateAccessToken = ({ id }) => {
  return sign(
    { id }, 
    process.env.ACCESS_TOKEN_SECRET!, 
    {expiresIn: '20m'}
  )
}
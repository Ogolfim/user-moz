import { sign } from "jsonwebtoken"
import { CreateAccessToken } from "../domain/contracts/CreateIdToken"


export const createAccessToken: CreateAccessToken = ({ id }) => {
  return sign(
    { id }, 
    process.env.ACCESS_TOKEN_SECRET!, 
    {expiresIn: '20m'}
  )
}
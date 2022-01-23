import { PrismaClient } from '@prisma/client'

import { User } from "../contracts/requiredField";

type ValidatedUser = User

const prisma = new PrismaClient()

const saveUser = ({ name, email, password }: ValidatedUser) => {

}
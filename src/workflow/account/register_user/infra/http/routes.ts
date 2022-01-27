import { Router } from 'express'

import { RegisterUserController } from './controller/register_user'

export const CreateRouter = Router()

CreateRouter.post('/', RegisterUserController)


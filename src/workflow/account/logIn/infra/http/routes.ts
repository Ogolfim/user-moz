import { Router } from 'express'

import { LoginUsingFormController } from './controller/use_form'

export const LogInRouter = Router()

LogInRouter.post('/form', LoginUsingFormController)
LogInRouter.post('/google', LoginUsingFormController)
LogInRouter.post('/linkedin', LoginUsingFormController)


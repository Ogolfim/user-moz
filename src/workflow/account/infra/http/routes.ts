import { Router } from 'express'
import { userLoggerByOauthontroller } from './controller/userLoggerByOauth'
import { userLoggerByPasswordController } from './controller/userLoggerByPassword'
import { userRegisterController } from './controller/userRegister'

const AccountRouter = Router()

AccountRouter.use('/login/form', userLoggerByPasswordController)
AccountRouter.use('/login/oauth', userLoggerByOauthontroller)
AccountRouter.post('/create', userRegisterController)


export default AccountRouter

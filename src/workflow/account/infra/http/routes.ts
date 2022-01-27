import { Router } from 'express'
import { LogInRouter } from '../../logIn/infra/http/routes'
import { CreateRouter } from '../../register_user/infra/http/routes'


const AccountRouter = Router()

AccountRouter.use('/login', LogInRouter)
AccountRouter.use('/create', CreateRouter)

export default AccountRouter

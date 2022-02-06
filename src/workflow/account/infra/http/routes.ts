import { Router } from 'express'
import { refreshTokenController } from './controller/refresh_token'
import { userAdderToTagsController } from './controller/add_user_to_tags'
import { userLoggerByOauthController } from './controller/login_by_oauth'
import { userLoggerByPasswordController } from './controller/login_by_password'
import { userPerfilController } from './controller/user_perfil'
import { userRegisterController } from './controller/user_register'

const AccountRouter = Router()

AccountRouter.post('/login/form', userLoggerByPasswordController)
AccountRouter.post('/login/oauth', userLoggerByOauthController)
AccountRouter.post('/create', userRegisterController)

AccountRouter.post('/tags', userAdderToTagsController)

AccountRouter.get('/perfil', userPerfilController)
AccountRouter.get('/token', refreshTokenController)

export default AccountRouter

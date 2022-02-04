import { Router } from 'express'
import { refreshTokenController } from './controller/refreshToken'
import { userAdderToTagsController } from './controller/userAdderToTags'
import { userLoggerByOauthController } from './controller/userLoggerByOauth'
import { userLoggerByPasswordController } from './controller/userLoggerByPassword'
import { userPerfilController } from './controller/userPerfil'
import { userRegisterController } from './controller/userRegister'

const AccountRouter = Router()

AccountRouter.post('/login/form', userLoggerByPasswordController)
AccountRouter.post('/login/oauth', userLoggerByOauthController)
AccountRouter.post('/create', userRegisterController)

AccountRouter.post('/tags', userAdderToTagsController)

AccountRouter.get('/perfil', userPerfilController)
AccountRouter.get('/token', refreshTokenController)


export default AccountRouter

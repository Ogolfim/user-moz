import { Router } from 'express'
import { refreshTokenController } from './controller/refresh_token'
import { userAdderToTagsController } from './controller/add_user_to_tags'
import { userLoggerByOauthController } from './controller/login_by_oauth'
import { userLoggerByPasswordController } from './controller/login_by_password'
import { userPerfilController } from './controller/user_perfil'
import { userRegisterController } from './controller/user_register'
import { removeUserFromTagsController } from './controller/remove_user_from_tags'
import { updateUserNameController } from './controller/update_user_name'
import { updateUserEmailController } from './controller/update_user_email'

const AccountRouter = Router()

AccountRouter.post('/login/form', userLoggerByPasswordController)
AccountRouter.post('/login/oauth', userLoggerByOauthController)
AccountRouter.post('/create', userRegisterController)

AccountRouter.post('/tags', userAdderToTagsController)
AccountRouter.put('/tags', removeUserFromTagsController)

AccountRouter.get('/perfil', userPerfilController)
AccountRouter.get('/token', refreshTokenController)

AccountRouter.put('/name', updateUserNameController)
AccountRouter.put('/email', updateUserEmailController)

export default AccountRouter

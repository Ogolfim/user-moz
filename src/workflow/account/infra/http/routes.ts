import { Router } from 'express'
import { refreshTokenController } from './controller/token/refresh_token'
import { userAdderToTagsController } from './controller/tags/add_user_to_tags'
import { removeUserFromTagsController } from './controller/tags/remove_user_from_tags'
import { userLoggerByOauthController } from './controller/login/login_by_oauth'
import { userLoggerByPasswordController } from './controller/login/login_by_password'
import { userPerfilController } from './controller/userInfo/user_perfil'
import { userRegisterController } from './controller/createUser/user_register'
import { updateUserNameController } from './controller/updateUser/update_user_name'
import { updateUserEmailController } from './controller/updateUser/update_user_email'
import { resetPasswordRequestController } from './controller/updateUser/reset_password_request'
import { resetPasswordController } from './controller/updateUser/reset_password'

const AccountRouter = Router()

AccountRouter.post('/login/form', userLoggerByPasswordController)
AccountRouter.post('/login/oauth', userLoggerByOauthController)
AccountRouter.post('/create', userRegisterController)

AccountRouter.post('/tags', userAdderToTagsController)
AccountRouter.put('/tags', removeUserFromTagsController)

AccountRouter.get('/perfil', userPerfilController)
AccountRouter.get('/token', refreshTokenController)

AccountRouter.post('/password', resetPasswordRequestController)
AccountRouter.put('/password', resetPasswordController)
AccountRouter.put('/name', updateUserNameController)
AccountRouter.put('/name', updateUserNameController)
AccountRouter.put('/email', updateUserEmailController)

export default AccountRouter

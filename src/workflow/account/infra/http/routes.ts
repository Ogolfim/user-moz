import { Router } from 'express'
import { refreshTokenController } from '@account/infra/http/controller/token/refresh_token'
import { userAdderToTagsController } from '@account/infra/http/controller/tags/add_user_to_tags'
import { removeUserFromTagsController } from '@account/infra/http/controller/tags/remove_user_from_tags'
import { userLoggerByOauthController } from '@account/infra/http/controller/login/login_by_oauth'
import { userLoggerByPasswordController } from '@account/infra/http/controller/login/login_by_password'
import { userPerfilController } from '@account/infra/http/controller/userInfo/user_perfil'
import { userRegisterController } from '@account/infra/http/controller/createUser/user_register'
import { updateUserNameController } from '@account/infra/http/controller/updateUser/update_user_name'
import { updateUserEmailController } from '@account/infra/http/controller/updateUser/update_user_email'
import { resetPasswordRequestController } from '@account/infra/http/controller/updateUser/reset_password_request'
import { resetPasswordController } from '@account/infra/http/controller/updateUser/reset_password'

const AccountRouter = Router()

AccountRouter.post('/login', userLoggerByPasswordController)
AccountRouter.post('/login/:serverName', userLoggerByOauthController)
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

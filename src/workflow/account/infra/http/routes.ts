import { Router } from 'express'
import { refreshTokenController } from '@account/infra/http/controller/token/refresh_token'
import { userAdderToTagsController } from '@account/infra/http/controller/tags/add_user_to_tags'
import { getUserTagsController } from '@account/infra/http/controller/tags/get_user_tags'
import { removeUserFromTagsController } from '@account/infra/http/controller/tags/remove_user_from_tags'
import { userLoggerByOauthController } from '@account/infra/http/controller/login/login_by_oauth'
import { userLoggerByPasswordController } from '@account/infra/http/controller/login/login_by_password'
import { getUserInfoController } from '@account/infra/http/controller/userInfo/get_user_info'
import { createUserInfoController } from '@account/infra/http/controller/userInfo/create_user_info'
import { userRegisterController } from '@account/infra/http/controller/createUser/user_register'
import { updateUserNameController } from '@account/infra/http/controller/updateUser/update_user_name'
import { updateUserEmailController } from '@account/infra/http/controller/updateUser/update_user_email'
import { resetPasswordRequestController } from '@account/infra/http/controller/updateUser/reset_password_request'
import { resetPasswordController } from '@account/infra/http/controller/updateUser/reset_password'
import { createEmployeeInfoController } from '@account/infra/http/controller/userInfo/create_employee_info'
import { createEmployeeController } from '@account/infra/http/controller/createUser/create_employee'

const AccountRouter = Router()

AccountRouter.post('/login', userLoggerByPasswordController)
AccountRouter.post('/login/:serverName', userLoggerByOauthController)
AccountRouter.post('/create', userRegisterController)
AccountRouter.post('/employee', createEmployeeController)

AccountRouter.get('/tags', getUserTagsController)
AccountRouter.post('/tags', userAdderToTagsController)
AccountRouter.put('/tags', removeUserFromTagsController)

AccountRouter.get('/info', getUserInfoController)
AccountRouter.post('/info/employee', createEmployeeInfoController)
AccountRouter.post('/info', createUserInfoController)

AccountRouter.get('/token', refreshTokenController)

AccountRouter.post('/password', resetPasswordRequestController)
AccountRouter.put('/password', resetPasswordController)
AccountRouter.put('/name', updateUserNameController)
AccountRouter.put('/name', updateUserNameController)
AccountRouter.put('/email', updateUserEmailController)

export default AccountRouter

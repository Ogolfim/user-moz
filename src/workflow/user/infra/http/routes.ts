import { findUserByEmailController } from '@user/infra/http/controller/find-user-by-email'
import { findUserByIdController } from '@user/infra/http/controller/find-user-by-id'
import { updateUserController } from '@user/infra/http/controller/update-user'
import { userSupportController } from '@user/infra/http/controller/user-support'
import { FastifyPluginCallback } from 'fastify'

export const userRouter: FastifyPluginCallback = (app, _option, done) => {
  app.put('/', updateUserController)
  app.get('/', findUserByIdController)
  app.post('/email', findUserByEmailController)
  app.post('/support', userSupportController)

  done()
}

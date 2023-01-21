import { createToolsUserController } from '@tools/infra/http/controller/create-tools-user'
import { FastifyPluginCallback } from 'fastify'

export const toolsRouter: FastifyPluginCallback = (app, _option, done) => {
  app.post('/v1/tools/user', createToolsUserController)

  done()
}

import { createToolsUserController } from '@tools/infra/http/controller/create-tools-user'
import { getToolsUserController } from '@tools/infra/http/controller/get-tools-user'
import { FastifyPluginCallback } from 'fastify'

export const toolsRouter: FastifyPluginCallback = (app, _option, done) => {
  app.post('/user', createToolsUserController)
  app.get('/user', getToolsUserController)

  done()
}

import { verifyJWT } from '@core/infra/middleware/auth/jwt'
import { unauthorized } from '@core/infra/middleware/http_error_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { FastifyRequest } from 'fastify'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const verifyAdmin: Middleware = (request: FastifyRequest, _httpBody) => {
  const httpResponse = pipe(
    TE.tryCatch(
      async () => {
        const bearerHeader = request.headers.authorization

        if (!bearerHeader) throw new Error('Not authorized')

        const token = bearerHeader.split(' ')[1]

        const { sub, admin } = await verifyJWT({ token })

        if (!admin) {
          throw new Error('Not authorized')
        }

        const body = request.body as any
        return { ...body, adminId: sub }
      },
      (_err) => {
        return unauthorized(new Error('Not authorized'))
      })
  )

  return httpResponse
}

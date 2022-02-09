import { Middleware } from '@core/infra/Middleware'
import { pipe } from 'fp-ts/lib/function'

const createBill: Middleware = (httpRequest, httpBody) => {
  const { name, email, phone, accountType, address, userId } = httpBody

  pipe()
}

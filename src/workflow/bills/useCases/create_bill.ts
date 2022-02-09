import { Middleware } from '@core/infra/Middleware'
import { pipe } from 'fp-ts/lib/function'

const createBill: Middleware = (httpRequest, httpBody) => {
  const { services, billPeriod, userId } = httpBody

  pipe()
}

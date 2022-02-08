import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { config } from 'dotenv'
import dotenvExpand from 'dotenv-expand'

import router from '@core/infra/http/routes'

dotenvExpand(config())

const app = express()

app.use(helmet())

app.use(
  express.json({
    type: ['application/json', 'text/plain']
  })
)

app.use(cookieParser())

app.use(
  cors({
    exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length']
  })
)

app.use(router)

export default app

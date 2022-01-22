import cors from 'cors'
import express from 'express'
import helmet from 'helmet';
import { config } from 'dotenv';
import dotenvExpand from 'dotenv-expand';

dotenvExpand(config());

import router from './routes'

const app = express()

app.use(
  cors({
    exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length'],
  })
)

app.use(helmet());

app.use(
  express.json({
    type: ['application/json', 'text/plain'],
  })
)

app.use(router)

export default app 
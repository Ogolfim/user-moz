import { Router } from 'express'

import AcountRouter from './account.routes'




const router = Router()

router.use('/account', AcountRouter)

export default router

import { Router } from 'express'

import AccountRouter from '../../../../workflow/account/infra/http/routes'




const router = Router()

router.use('/account', AccountRouter)

export default router

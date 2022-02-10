import { Router } from 'express'

import AccountRouter from '@account/infra/http/routes'
import MeAdminRouter from '@meAdmin/infra/http/routes'
import BillsRouter from '@bills/infra/http/routes'

const router = Router()

router.use('/account', AccountRouter)
router.use('/admin', MeAdminRouter)
router.use('/bills', BillsRouter)

export default router

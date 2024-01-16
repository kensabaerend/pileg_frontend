import express from 'express'
import votesResultController from '../controllers/votesResultController.js'
import { protectAdminRoute } from '../middlewares/protectRoute.js'

const router = express.Router()

router.post(
  '/validBallots/:villageId',
  protectAdminRoute,
  votesResultController.fillValidBallotsDetail
)

router.get('/', protectAdminRoute, votesResultController.getAllResult)
router.get(
  '/district/:districtId',
  protectAdminRoute,
  votesResultController.getAllResultsByDistrict
)
router.get('/regency', protectAdminRoute, votesResultController.getAllResult)

export default router

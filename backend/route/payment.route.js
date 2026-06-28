import express from 'express'
import { PaymentHandler } from '../controller/payement.controller.js'

const router = express.Router()

router.post("/",PaymentHandler)

export default router
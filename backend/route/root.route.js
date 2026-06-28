import express from 'express'
import { allDestinations, oneDestination, onePackage } from '../controller/destination.controller.js';

const router = express.Router();

router.get("/destinations",allDestinations)
router.get("/destinations/:id",oneDestination)
router.get("/destinations/:did/:pid",onePackage)

export default router;

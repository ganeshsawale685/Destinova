import express from 'express'
import { cancelBooking, createBooking, myBooking, statusUpdate } from '../controller/booking.controller.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post("/",auth,createBooking);
router.get("/my",auth,myBooking)
router.put("/:id",auth,statusUpdate)
router.delete("/:id/cancel",auth,cancelBooking)


export default router
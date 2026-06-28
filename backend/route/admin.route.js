import express from 'express'
import { addDestintion, addPackages, allBookings, allDestination, allUsers, deletePackages, fetchAll, updatePackages } from '../controller/admin.controller.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get("/users",auth,allUsers);

router.post("/destinations",auth,addDestintion)

router.get("/destinations",auth,allDestination)

router.post("/package",auth,addPackages)

router.get("/packages",auth,fetchAll);

router.get("/bookings",auth,allBookings)

router.put("/package/:id",auth,updatePackages);

router.delete("/package/:id",auth,deletePackages)

export default router;
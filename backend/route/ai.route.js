import express from 'express'
import { aiChat } from '../controller/ai.controller.js';

const router = express.Router()

router.post("/",aiChat);

export default router;
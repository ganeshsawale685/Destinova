import express from 'express'
import { fetchAll } from '../controller/packages.controller.js';

const router = express.Router();

router.get("/",fetchAll);


export default router;

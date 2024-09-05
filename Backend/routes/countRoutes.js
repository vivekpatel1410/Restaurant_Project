import express from 'express';
import { getCounts } from '../controller/countController.js';

const router = express.Router();

router.get('/counts', getCounts);

export default router;

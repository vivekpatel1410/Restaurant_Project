import express from "express";
import { sendReservation, getAllReservations, deleteReservation } from '../controller/reservationController.js';

const router = express.Router();

router.post('/send', sendReservation);
router.get('/all', getAllReservations);
router.delete('/:id', deleteReservation);

export default router;

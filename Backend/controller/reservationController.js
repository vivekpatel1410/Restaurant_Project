import { Reservation } from '../models/reservationSchema.js';
import ErrorHandler from "../error/error.js";

// Create a reservation
export const sendReservation = async (req, res, next) => {
    const { firstname, lastname, email, phone, date, time } = req.body;

    if (!firstname || !lastname || !email || !phone || !date || !time) {
        return next(new ErrorHandler("Please fill out the entire reservation form!", 400));
    }

    try {
        await Reservation.create({ firstname, lastname, email, phone, date, time });
        res.status(201).json({
            success: true,
            message: "Reservation created successfully!"
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map((err) => err.message);
            return next(new ErrorHandler(validationErrors.join(", "), 400));
        }
        return next(error);
    }
};

// Get all reservations
export const getAllReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find({});
        res.status(200).json({ success: true, data: reservations });
    } catch (error) {
        next(error);
    }
};

// Delete a reservation
export const deleteReservation = async (req, res, next) => {
    const { id } = req.params;

    try {
        const reservation = await Reservation.findByIdAndDelete(id);

        if (!reservation) {
            return next(new ErrorHandler('Reservation not found', 404));
        }

        res.status(200).json({ success: true, message: 'Reservation deleted successfully' });
    } catch (error) {
        next(error);
    }
};

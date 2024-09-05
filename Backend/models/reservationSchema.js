import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required:true,
        minLength:[3,"Firstname must content at least 3 character!"],
        maxLength:[30,"Firstname cannot exceed 30 character!"],
    },

    lastname: {
        type:String,
        required:true,
        minLength:[3,"lastname must content at least 3 character!"],
        maxLength:[30,"lastname cannot exceed 30 character!"],
    },

    email: {
        type:String,
        required:true,
        validate: [validator.isEmail,"Provide a valid email"],
    },

    phone: {
        type:String,
        required:true,
        minLength:[11,"phone number must content at least 11 digits!"],
        maxLength:[11,"phone number must content at least 11 digits!"],
    },

    time: {
        type:String,
        required:true,
    },


    date: {
        type:String,
        required:true,
    },

});

export const Reservation = mongoose.model("Reservation",reservationSchema);
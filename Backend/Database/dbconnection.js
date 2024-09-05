import mongoose from "mongoose";

export const dbconnection = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "myDB",
    })
    .then(() => {
        console.log("Connected to Database Successfully");
    })
    .catch((err) => {
        console.error(`Database connection error: ${err}`);
    });
};

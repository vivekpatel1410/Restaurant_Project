import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbconnection } from './Database/dbconnection.js'; 
import { errorMiddlewear } from './error/error.js';
import reservationRouter from './routes/reservationRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import countRoutes from './routes/countRoutes.js';


const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);
app.use("/api/v1/restourant_team", teamRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use('/api/v1', countRoutes);

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "HELLO WORLD AGAIN"
    });
});


dbconnection();

app.use(errorMiddlewear);

export default app;

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";


import cors from "cors";
import {connectDB} from "./lib/db.js"
import { protectRoute } from "./middleware/auth.middleware.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

//To increase capacity of server to be able to handle large profile images
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);

app.listen(5001, () => {
    console.log("Listening on PORT: " + PORT)
    connectDB();
});
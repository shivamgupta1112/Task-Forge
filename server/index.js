import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Server is running",
        environment: process.env.NODE_ENV || "development",
        uptime: process.uptime()
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
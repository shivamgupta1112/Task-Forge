import prisma from "../../lib/prisma.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                phone,
                password: hashedPassword
            }
        });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    };
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
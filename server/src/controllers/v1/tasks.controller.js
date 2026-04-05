import prisma from "../../lib/prisma.js";

export const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.user.id;
        const task = await prisma.task.create({
            data: {
                title,
                userId
            }
        });
        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await prisma.task.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        });
        res.status(200).json({ tasks });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const userId = req.user.id;
        const task = await prisma.task.findUnique({
            where: { id: id },
        });
        if (!task || task.userId !== userId) {
            return res.status(404).json({ message: "Task not found" });
        }
        await prisma.task.delete({
            where: { id: id },
        });
        res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
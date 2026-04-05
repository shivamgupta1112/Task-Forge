import React, { useState, useEffect } from "react";
import api from "@/utils/api";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
    const navigate = useNavigate();

    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("taskforge-token");
        if (!token) {
            console.log("No token found, redirecting to login...");
            navigate("/login");
            return;
        }
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("taskforge-token");
            console.log("Token expired, logging out...");
            navigate("/login");
        }

        // fetch all TM for the user
        api.getTasks().then((res) => {
            setTasks(res.tasks);
        }).catch((err) => {
            console.error("Error fetching tasks:", err);
            if (err.status === 401) {
                localStorage.removeItem("taskforge-token");
                navigate("/login");
            }
        });
    }, []);

   const handleAddTask = async () => {
    if (!task.trim()) return;
    
    try {
        const newTask = await api.createTask(task); 
        setTasks([newTask.task, ...tasks]); 
        setTask("");
    } catch (error) {
        console.error("Failed to add task:", error);
    }
};

    const handleDeleteTask = async (index) => {
        await api.deleteTask(tasks[index].id);
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div className="h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center p-6 overflow-hidden">
            
            {/* Logo + Title */}
            <div className="flex flex-col items-center mb-6 shrink-0">
                <img 
                    src="/logo.png" 
                    alt="Task Forge" 
                    className="w-20 h-20 rounded-xl shadow-lg"
                />
                <h1 className="text-3xl font-bold text-white mt-3">
                    Task Forge
                </h1>
                <p className="text-gray-400 text-sm">
                    Begin your productivity journey 🚀
                </p>
            </div>

            {/* Main Card */}
            <Card className="w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl rounded-2xl bg-gray-800 border-none">
                
                <CardHeader className="shrink-0">
                    <CardTitle className="text-white text-xl text-center">
                        Add Your Tasks
                    </CardTitle>

                    {/* Input + Button */}
                    <div className="flex gap-2 mt-4">
                        <Input
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="Enter your task..."
                            className="bg-gray-700 text-white border-none"
                        />
                        <Button onClick={handleAddTask}>
                            Add
                        </Button>
                    </div>
                </CardHeader>

                {/* Scrollable Content */}
                <CardContent className="flex-1 overflow-y-auto">
                    <div className="space-y-3">
                        {tasks.length === 0 ? (
                            <p className="text-gray-400 text-center">
                                No tasks yet! Add some to get started.
                            </p>
                        ) : (
                            tasks.map((t, i) => (
                                <div 
                                    key={i}
                                    className="bg-gray-700 text-white px-4 py-2 rounded-lg flex justify-between items-center"
                                >
                                    <span>{t.title}</span>
                                    <button
                                        onClick={() => handleDeleteTask(i)}
                                        className="text-red-400 hover:text-red-600"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>

            </Card>
        </div>
    );
};

export default Dashboard;
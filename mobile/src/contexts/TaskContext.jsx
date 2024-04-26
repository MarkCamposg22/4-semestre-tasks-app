import { createContext, useContext, useEffect, useState } from "react";

import { env } from "../config/env";
import { AuthContext } from "./AuthContext";

export const TaskContext = createContext({});

export const TaskContextProvider = ({ children }) => {
    const { token } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${env.apiUrl}/api/task`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                return;
            }

            setTasks(data);
        } catch (error) {
            console.log(error);
            setError("Erro interno.");
        } finally {
            setLoading(false);
        }
    };

    const createTask = async ({ title }) => {
        try {
            setLoading(true);

            const response = await fetch(`${env.apiUrl}/api/task`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                return;
            }

            await getTasks();
        } catch (error) {
            console.log(error);
            setError("Erro interno.");
        } finally {
            setLoading(false);
        }
    };

    const updateTask = async ({ idTask, finished }) => {
        try {
            setLoading(true);

            const response = await fetch(`${env.apiUrl}/api/task/${idTask}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ finished }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                return;
            }

            await getTasks();
        } catch (error) {
            console.log(error);
            setError("Erro interno.");
        } finally {
            setLoading(false);
        }
    };

    const removeTask = async ({ idTask }) => {
        try {
            setLoading(true);

            const response = await fetch(`${env.apiUrl}/api/task/${idTask}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                return;
            }

            await getTasks();
        } catch (error) {
            console.log(error);
            setError("Error interno.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                loading,
                error,
                setError,
                tasks,
                createTask,
                updateTask,
                removeTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

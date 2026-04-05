import { fetchWithInterceptor } from "./apiClient";

const api = {
    login: async (email, password) => {
        return fetchWithInterceptor("/v1/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
    },

    register: async (email, phone, password) => {
        return fetchWithInterceptor("/v1/auth/create", {
            method: "POST",
            body: JSON.stringify({ email, phone, password }),
        });
    },

    getTasks: async () => {
        return fetchWithInterceptor("/v1/tasks", {
            method: "GET",
        });
    },

    createTask: async (title, deadline) => {
        return fetchWithInterceptor("/v1/tasks", {
            method: "POST",
            body: JSON.stringify({ title, deadline }),
        });
    },

    updateTask: async (id, title, deadline, completed) => {
        return fetchWithInterceptor(`/v1/tasks/${id}`, {
            method: "PUT",
            body: JSON.stringify({ title, deadline, completed }),
        });
    },

    deleteTask: async (id) => {
        return fetchWithInterceptor(`/v1/tasks/${id}`, {
            method: "DELETE",
        });
    }

};

export default api;
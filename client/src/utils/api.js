import { fetchWithInterceptor } from "./apiClient";

const api = {
    login: async (email, password) => {
        return fetchWithInterceptor("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
    },

    register: async (email, phone, password) => {
        return fetchWithInterceptor("/auth/create", {
            method: "POST",
            body: JSON.stringify({ email, phone, password }),
        });
    },
};

export default api;
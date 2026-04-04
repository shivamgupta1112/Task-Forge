const environment = import.meta.env.NODE_ENV || "development";

const API_BASE_URL =
    environment === "production"
        ? import.meta.env.VITE_API_BASE_URL
        : "http://localhost:5000/api/v1";

const requestInterceptor = (options = {}) => {
    const token = localStorage.getItem("taskforge-token");
    if (environment === "development") {
        console.log("API Request Options:", options);
    }
    return {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    };
};

const responseInterceptor = async (response) => {
    if (environment === "development") {
        console.log("API Response:", response);
    }
    if (!response.ok) {
        let error;
        try {
            error = await response.json();
        } catch {
            error = { message: "Something went wrong" };
        }

        if (response.status === 401) {
            localStorage.removeItem("taskforge-token");
            window.location.href = "/login";
        }

        throw error;
    }
    return response.json();
};

export const fetchWithInterceptor = async (url, options = {}) => {
    const modifiedOptions = requestInterceptor(options);

    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...modifiedOptions,
        credentials: "include",
    });

    return responseInterceptor(response);
};
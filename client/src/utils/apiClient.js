const environment = import.meta.env.MODE || "development";

const API_BASE_URL =
    environment === "production"
        ? import.meta.env.VITE_API_BASE_URL
        : "http://localhost:5000/api";

const requestInterceptor = (url, options = {}) => {
    const token = localStorage.getItem("taskforge-token");

    const finalUrl = `${API_BASE_URL}${url}`;

    if (environment === "development") {
        console.log("🚀 API REQUEST:");
        console.log("URL:", finalUrl);
        console.log("Method:", options.method || "GET");
        console.log("Headers:", {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        });

        if (options.body) {
            try {
                console.log("Body:", JSON.parse(options.body));
            } catch {
                console.log("Body (raw):", options.body);
            }
        }
    }

    return {
        finalUrl,
        options: {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
        },
    };
};

const responseInterceptor = async (response) => {
    let data;

    try {
        data = await response.clone().json();
    } catch {
        data = null;
    }

    if (environment === "development") {
        console.log("📥 API RESPONSE:");
        console.log("URL:", response.url);
        console.log("Status:", response.status);
        console.log("Data:", data);
    }

    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem("taskforge-token");
            window.location.href = "/login";
        }

        throw data || { message: "Something went wrong" };
    }

    return data;
};

export const fetchWithInterceptor = async (url, options = {}) => {
    const { finalUrl, options: modifiedOptions } = requestInterceptor(url, options);

    const response = await fetch(finalUrl, {
        ...modifiedOptions,
        credentials: "include",
    });

    return responseInterceptor(response);
};
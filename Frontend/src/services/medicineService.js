import axios from "axios";

const API_URL = "/api/medicines";

// Get all available medicines
export const getMedicines = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching medicines:", error);
        throw error;
    }
};

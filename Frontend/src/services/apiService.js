import axios from "axios";

const BASE_URL = "http://localhost:5080/api";

export const addMedicine = async (medicineData) => {
  try {
    const response = await axios.post(`${BASE_URL}/branchstock`, medicineData);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error adding medicine:", error.response?.data || error.message);
    throw error; // Re-throw the error for handling in the component
  }
};
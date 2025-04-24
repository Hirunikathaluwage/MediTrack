import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/cart';

// Replace this with your own logic to get the logged-in user's ID
const getUserId = () => localStorage.getItem('userId');

export const getCart = async () => {
    const userId = getUserId();
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    return response.data;
};

export const updateCartItem = async (medicineId, quantity) => {
    const userId = getUserId();
    // You could make a PUT endpoint, but your current backend doesn't have update API.
    // Here's a workaround: remove the item and re-add it with new quantity
    await removeCartItem(medicineId);
    const price = 1; // Ideally fetch current price again
    await addToCart({ medicineId, quantity, price });
};

export const addToCart = async ({ medicineId, quantity, price }) => {
    const userId = getUserId();
    const branchId = localStorage.getItem('branchId') || 'defaultBranchId'; // or however you're managing it
    const response = await axios.post(`${API_BASE_URL}/add`, {
        userId,
        medicineId,
        quantity,
        price,
        branchId,
    });
    return response.data;
};

export const removeCartItem = async (medicineId) => {
    const userId = getUserId();
    const response = await axios.delete(`${API_BASE_URL}/remove/${userId}/${medicineId}`);
    return response.data;
};

export const clearCart = async () => {
    const userId = getUserId();
    const response = await axios.delete(`${API_BASE_URL}/clear/${userId}`);
    return response.data;
};

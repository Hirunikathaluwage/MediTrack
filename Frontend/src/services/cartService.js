import axios from 'axios';

const API_BASE_URL = 'http://localhost:5080/api/cart';

// Replace this with your own logic to get the logged-in user's ID
const getUserId = () => localStorage.getItem('67ddfc9755c1bec1fb5cf57f');

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

// cartService.js
export const addToCart = async (userId, medicineId) => {
    const payload = {
        userId,
        items: [
            {
                medicineId,
                quantity: 1, // or any quantity logic
            }
        ]
    };

    return axios.post('http://localhost:5080/api/cart', payload);
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

import axios from "axios";

const API_URL = "/api/orders";

// Get all orders for a user
export const getOrderHistory = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order history:", error);
        throw error;
    }
};

// Fetch order details by orderId
export const getOrderDetails = async (orderId) => {
    try {
        const response = await axios.get(`${API_URL}/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order details:", error);
        throw error;
    }
};


import API from "./api"; //handling API requests

export const createOrder = async (orderData) => API.post("/orders/create", orderData);
export const getAllOrders = async () => API.get("/orders");
export const getOrderById = async (orderId) => API.get(`/orders/${orderId}`);
export const getOrdersByUserId = async (userId) => API.get(`/orders/user/${userId}`);
export const updateOrderStatus = async (orderId, status) => API.put(`/orders/${orderId}`, { status });
export const deleteOrder = async (orderId) => API.delete(`/orders/${orderId}`);
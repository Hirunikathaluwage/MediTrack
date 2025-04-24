import axios from "axios";

const API_URL = "/api/payments";

// Fetch all payments
export const getPayments = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching payments:", error);
        throw error;
    }
};

// Update payment verification status (approve/reject)
export const updatePaymentStatus = async (paymentId, status) => {
    try {
        const response = await axios.patch(`${API_URL}/${paymentId}`, {
            verificationStatus: status,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating payment status:", error);
        throw error;
    }
};

import API from "./api"; //handling API requests


/* For Payment  */
export const createPayment = async (paymentData) => API.post("/payments", paymentData);
// export const verifyPayment = async (orderId) => API.put(`/payments/verify/${orderId}`);
export const getPaymentByOrderId = async (orderId) => API.get(`/payments/${orderId}`);

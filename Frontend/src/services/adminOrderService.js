import axios from "axios";

const API_BASE = "http://localhost:5080/api/orders"; // 

// Fetch all orders
export const getAllOrders = async () => {
    const response = await axios.get(`${API_BASE}`);
    return response.data;
};


// Update order status
export const handleUpdateOrderStatus = async (orderId, newStatus, newPaymentStatus) => {
    try {
        const response = await axios.patch(`${API_BASE}/status/${orderId}`, { newStatus, newPaymentStatus });
        if (response.status === 200) {
            return response.data.updatedOrder;
        } else {
            throw new Error("Failed to update order status");
        }
    } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
    }
};



// Delete an order
export const deleteOrder = async (orderId) => {
    const response = await axios.delete(`${API_BASE}/orders/${orderId}`);
    return response.data;
};

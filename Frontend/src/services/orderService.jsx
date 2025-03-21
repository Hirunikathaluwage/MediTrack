import API from "./api";

/*  For Order  */
export const createOrder = async (orderData) => API.post("/orders", orderData);
export const getAllOrders = async () => API.get("/orders");
export const getOrderById = async (orderId) => API.get(`/orders/${orderId}`);
export const getOrderByUserId = async (userId) => API.get(`/orders/user/${userId}`);


/* For Payment  */
export const createPayment = async (paymentData) => API.post("/payments", paymentData);
export const getPaymentByOrderId = async (orderId) => API.get(`/payments/${orderId}`);



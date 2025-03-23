import API from "./api";

export const getDeliveries = async () => API.get("/delivery");

export const createDelivery = async (delivery) => API.post("/delivery", delivery);
  
export const updateDelivery = async (delivery) => API.put(`/delivery/${delivery.id}`, delivery);

export const deleteDelivery = async (id) => API.delete(`/delivery/${id}`);

export const getDeliveryFeedbacks = async () => API.get("/"); // Fetch all feedback

export const createDeliveryFeedback = async (feedback) => API.post("/feedbacks/submit", feedback);

export const addDeliveryPerson = async (deliveryPerson) => API.post("/delivery-persons", deliveryPerson);

export const getDeliveryPeople = async () => API.get("/delivery-persons");

export const getAvailableDrivers = async () => API.get("/delivery-persons/available");

export const updateAvailability = async (id, availability) => API.put(`/delivery-persons/${id}/availability`, { availability });

export const getDeliveryPersonById = async (id) => API.get(`/delivery-persons/${id}`);

export const deleteDeliveryPerson = async (id) => API.delete(`/delivery-persons/${id}`);
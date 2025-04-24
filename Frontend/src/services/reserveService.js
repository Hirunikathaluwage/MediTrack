// services/reserveService.js
import axios from 'axios';

export const reserveMedicine = async (medicineId) => {
    const res = await axios.post(`http://localhost:5080/reservations`, {
        medicineId,
    });
    return res.data;
};

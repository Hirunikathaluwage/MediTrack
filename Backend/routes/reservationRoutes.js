// reservation.routes.js
import express from 'express';

const router = express.Router();

import {
    createReservation,
    getUserReservations,
    updateReservationStatus,
    deleteReservation,
    updateReservation,
    getAllReservations
} from '../controllers/reservationController.js';

// User creates a reservation
router.post('/', createReservation);

router.put('/update/:reservationId', updateReservation); // User updates reservation items

// User gets their reservations
router.get('/user', getUserReservations);

// Admin/system updates reservation status
router.patch('/:id', updateReservationStatus);

// User cancels/deletes reservation
router.delete('/:id', deleteReservation);

router.get('/', getAllReservations);


export default router;

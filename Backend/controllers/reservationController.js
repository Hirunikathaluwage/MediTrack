import Reservation from '../models/Reservation.js'
import Medicine from '../models/Medicine.js'

// Add a new reservation
export const createReservation = async (req, res) => {
    try {
        const { userId, items } = req.body;

        const reservation = new Reservation({
            userId,
            items,
            createdAt: new Date()
        });

        await reservation.save();

        res.json({
            success: true,
            reservationId: reservation._id,
            message: "Reservation created successfully"
        });

    } catch (error) {
        console.error("Error creating reservation:", error);
        res.status(500).json({ success: false, message: "Error creating reservation." });
    }
};

export const updateReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const { items } = req.body;

        // Validate
        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: "No items provided to update." });
        }

        // Find the reservation
        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.status(404).json({ success: false, message: "Reservation not found." });
        }

        // Update quantities for existing items
        items.forEach(item => {
            const existingItem = reservation.items.find(reservedItem => reservedItem.medicineId.toString() === item.medicineId.toString());
            if (existingItem) {
                existingItem.quantity = item.quantity; // Update quantity of the existing item
            } else {
                // If item does not exist in the reservation, you can choose to add it or handle it differently
                reservation.items.push(item);
            }
        });

        // Save updated reservation
        await reservation.save();

        res.status(200).json({ success: true, message: "Reservation updated successfully.", reservation });
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ success: false, message: "Failed to update reservation." });
    }
};


// Get all reservations for a user
export const getUserReservations = async (req, res) => {
    try {
        const { userId } = req.query;  // Get userId from query params

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required." });
        }

        const reservations = await Reservation.find({ userId })
            .populate('items.medicineId');  // Populate the medicine details for each item

        res.status(200).json({ success: true, reservations });
    } catch (error) {
        console.error('Error fetching user reservations:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch reservations' });
    }
};

export const updateReservationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'available' or 'notified'

        if (!status) {
            return res.status(400).json({ success: false, message: "Status is required." });
        }

        const reservation = await Reservation.findById(id);
        if (!reservation) {
            return res.status(404).json({ success: false, message: 'Reservation not found' });
        }

        // Update reservation's main status
        reservation.status = status;

        // ALSO update each item's status
        reservation.items.forEach(item => {
            item.status = status;
        });

        await reservation.save();

        res.status(200).json({ success: true, reservation });
    } catch (error) {
        console.error('Error updating reservation status:', error);
        res.status(500).json({ success: false, message: 'Failed to update reservation' });
    }
};



// Delete a reservation (optional)
export const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;

        await Reservation.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Reservation deleted' });
    } catch (error) {
        console.error('Error deleting reservation:', error);
        res.status(500).json({ success: false, message: 'Failed to delete reservation' });
    }
};


// Get all reservations
export const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('items.medicineId');  // Populate medicine details

        res.status(200).json({ success: true, reservations });
    } catch (error) {
        console.error('Error fetching all reservations:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch reservations' });
    }
};



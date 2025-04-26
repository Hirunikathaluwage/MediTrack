import Delivery from "../models/Delivery.js";
import User from "../models/User.js";

export const createDelivery = async (req, res) => {
  try {
    const { userId, orderId, receiverName, contact, location, landmarks } = req.body;

    // Validate userId
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    // You can also validate orderId if needed (optional)

    const delivery = new Delivery({
      userId,
      orderId,   // <-- Here! Order ID saved in delivery
      receiverName,
      contact,
      location,
      landmarks,
      status: 'in transit', // default
    });

    const savedDelivery = await delivery.save();
    res.status(201).json(savedDelivery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create delivery request' });
  }
};



// Get all delivery requests
export const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().populate('userId', 'name email');
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deliveries' });
  }
};

// Get a single delivery request by ID
export const getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id).populate(
      'userId',
      'name email'
    );
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    res.status(200).json(delivery);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch delivery' });
  }
};

// Delete a delivery request
export const deleteDelivery = async (req, res) => {
  try {
    const deletedDelivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!deletedDelivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    res.status(200).json({ message: 'Delivery deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete delivery' });
  }
};

// filepath: c:\Users\Jason Perera\Desktop\ITP NEW\MediTrack\Backend\controllers\DeliveryController.js
export const getDeliveriesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch deliveries for the given userId
    const deliveries = await Delivery.find({ userId }).populate('userId', 'name email');
    if (!deliveries || deliveries.length === 0) {
      return res.status(404).json({ error: 'No deliveries found for this user' });
    }

    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deliveries for the user' });
  }
};

// filepath: c:\Users\Jason Perera\Desktop\ITP NEW\MediTrack\Backend\controllers\DeliveryController.js
export const updateDeliveryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['pending', 'in transit', 'delivered'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedDelivery = await Delivery.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedDelivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    res.status(200).json(updatedDelivery);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update delivery status' });
  }
};

export const assignDriverToDelivery = async (req, res) => {
  const { deliveryId } = req.params;
  const { driverId, driverName } = req.body;

  try {
    const updatedDelivery = await Delivery.findByIdAndUpdate(
      deliveryId,
      {
        driverId,
        driver: driverName,
        status: "in transit", // optional: auto update status
      },
      { new: true }
    );

    if (!updatedDelivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    res.status(200).json(updatedDelivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import Delivery from "../models/Delivery.js";
import User from "../models/User.js";
import Driver from "../models/Driver.js"; // 🛠️ Important: we import Driver model also

export const createDelivery = async (req, res) => {
  try {
    const { userId, orderId, receiverName, contact, location, landmarks } = req.body;

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const delivery = new Delivery({
      userId,
      orderId,
      receiverName,
      contact,
      location,
      landmarks,
      status: 'in transit',
    });

    const savedDelivery = await delivery.save();
    res.status(201).json(savedDelivery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create delivery request' });
  }
};

export const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find()
      .populate('userId', 'name email')
      .populate('driverId', 'firstName lastName email phone vehicleNumber'); // 🛠️ Added driver details
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deliveries' });
  }
};

export const getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('driverId', 'firstName lastName email phone vehicleNumber');

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    const driverInfo = delivery.driverId
      ? {
          name: `${delivery.driverId.firstName} ${delivery.driverId.lastName}`,
          contact: delivery.driverId.phone,
          vehicleNo: delivery.driverId.vehicleNumber,
          rating: 4.5, // 🔥 (Hardcoded for now, you can fetch real rating later if needed)
        }
      : null;

    res.status(200).json({
      ...delivery._doc,
      driver: driverInfo,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch delivery' });
  }
};


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

export const getDeliveriesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const deliveries = await Delivery.find({ userId })
      .populate('userId', 'name email');
    if (!deliveries || deliveries.length === 0) {
      return res.status(404).json({ error: 'No deliveries found for this user' });
    }
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deliveries for the user' });
  }
};

export const updateDeliveryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'in transit', 'delivered', 'failed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedDelivery = await Delivery.findByIdAndUpdate(
      id,
      { status },
      { new: true }
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
  const { id } = req.params;
  const { driverId, driverName } = req.body;

  try {
    const delivery = await Delivery.findById(id);
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    // Double-check driver exists
    const driverExists = await Driver.findById(driverId);
    if (!driverExists) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    delivery.driverId = driverId;
    delivery.driver = driverName;
    delivery.status = "in transit";

    await delivery.save();

    res.status(200).json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

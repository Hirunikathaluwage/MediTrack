import Driver from '../models/Driver.js';

// Create a new driver
export const createDriver = async (req, res) => {
  const { firstName, lastName, email, phone, vehicleNumber, branch } = req.body;

  try {
    const newDriver = new Driver({
      firstName,
      lastName,
      email,
      phone,
      vehicleNumber,
      branch,
    });

    const savedDriver = await newDriver.save();
    res.status(201).json(savedDriver);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add driver', error: error.message });
  }
};

// Get all drivers
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch drivers', error: error.message });
  }
};

// router.get('/:id', async (req, res) => {

export const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch driver', error: error.message });
  }
};

// router.put('/:id', async (req, res) => {
export const updateDriver = async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated document and validate
    );
    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update driver', error: error.message });
  }
};

// router.delete('/:id', async (req, res) => {
export const deleteDriver = async (req, res) => {
  try {
    const deletedDriver = await Driver.findByIdAndDelete(req.params.id);
    if (!deletedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete driver', error: error.message });
  }
};

// GET drivers by branch name
export const getDriversByBranch = async (req, res) => {
  try {
    const { branchName } = req.params;

    if (!branchName) {
      return res.status(400).json({ message: 'Branch name is required' });
    }

    const drivers = await Driver.find({ branch: branchName });

    if (!drivers.length) {
      return res.status(404).json({ message: 'No drivers found for this branch' });
    }

    res.status(200).json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    res.status(500).json({ message: 'Server error while fetching drivers' });
  }
};
// adminPrescriptionController.js
import Prescription from '../models/Prescription.js';



export const getPrescriptionsByBranch = async (req, res) => {
  try {
    const { branchId } = req.params;

    const prescriptions = await Prescription.find({ branchId }).populate('medicines.medicineId');

    res.status(200).json({ success: true, prescriptions });
  } catch (error) {
    console.error('Error fetching prescriptions by branch:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const getMedicinesByPrescription = async (req, res) => {
  try {
    const { id } = req.params;

    const prescription = await Prescription.findById(id).populate('medicines.medicineId');

    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }

    const medicines = prescription.medicines.map(med => ({
      name: med.medicineId.name,
      quantity: med.quantity
    }));

    res.status(200).json({ success: true, data: medicines });
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};



export const updatePrescriptionStatus = async (req, res) => {
  try {
    const { prescriptionId } = req.params;
    const { status } = req.body;

    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }

    prescription.status = status;
    await prescription.save();

    res.status(200).json({ success: true, message: 'Prescription status updated' });
  } catch (error) {
    console.error('Error updating prescription status:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

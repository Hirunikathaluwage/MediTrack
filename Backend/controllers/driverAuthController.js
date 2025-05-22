// File: controllers/driverAuthController.js

export const driverLogin = (req, res) => {
    const { email, password } = req.body;
  
    const hardcodedEmail = 'driver@gmail.com';
    const hardcodedPassword = 'driver123';
  
    if (email === hardcodedEmail && password === hardcodedPassword) {
      return res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
  };
  
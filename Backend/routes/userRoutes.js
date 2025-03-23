import express from 'express'
const router = express.Router();
app.use('/api/user', userRoutes);


// Example Route: Fetch the latest logged-in user's ID
app.get('/api/user', async (req, res) => {
  try {
    // Adjust the logic to fetch based on your app's auth/session
    const user = await User.findOne(); // Fetch the first user (mock for now)
    res.json({ userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

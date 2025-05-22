import e from 'express';
import Rating from '../models/Rating.js';

// Create a new rating
export const createRating = async (req, res) => {
  const { deliveryId, overall, driver, selectedTags, comment } = req.body;

  try {
    const newRating = new Rating({
      deliveryId,
      overall,
      driver,
      selectedTags,
      comment,
    });

    const savedRating = await newRating.save();
    res.status(201).json(savedRating);
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit rating', error: error.message });
  }
};

// Get ratings for a specific delivery
export const getRatingsByDeliveryId = async (req, res) => {
  const { deliveryId } = req.params;

  try {
    const ratings = await Rating.find({ deliveryId });
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ratings', error: error.message });
  }
};


// Get all ratings

export const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().populate('deliveryId');
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ratings', error: error.message });
  }
};

// Get driver performance summary
// router.get('/performance', async (req, res) => {
export const getDriverPerformance = async (req, res) => {
  try {
    const performance = await Rating.aggregate([
      {
        $group: {
          _id: '$deliveryId', // Group by deliveryId
          overallRating: { $avg: '$overall' }, // Calculate average overall rating
          driverRating: { $avg: '$driver' }, // Calculate average driver rating
          totalDeliveries: { $sum: 1 }, // Count total deliveries
          topTags: { $push: '$selectedTags' }, // Collect all selected tags
        },
      },
      {
        $project: {
          _id: 1,
          overallRating: 1,
          driverRating: 1,
          totalDeliveries: 1,
          // Reduce topTags to a unique set of tags
          topTags: { $reduce: { input: '$topTags', initialValue: [], in: { $setUnion: ['$$value', '$$this'] } } },
        },
      },
    ]);
    res.status(200).json(performance);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch performance data', error: error.message });
  }
  
};
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StarIcon, ThumbsUpIcon } from 'lucide-react';
import StarRating from './StarRating';

const RatingPage = () => {
  const { deliveryId } = useParams();
  const navigate = useNavigate();

  const [ratings, setRatings] = useState({
    overall: 0,
    driver: 0,
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [comment, setComment] = useState('');

  const feedbackTags = [
    'On-time delivery',
    'Friendly driver',
    'Good communication',
    'Careful handling',
    'Followed instructions',
    'Professional service',
    'Polite behavior',
    'Clean vehicle',
    'Contactless delivery',
    'Went extra mile',
  ];

  const handleRatingChange = (type, value) => {
    setRatings({
      ...ratings,
      [type]: value,
    });
  };

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      deliveryId,
      ratings,
      selectedTags,
      comment,
    });
    navigate('/thank-you');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-2">
          <StarIcon size={36} className="text-yellow-500" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Rate Your Delivery
        </h1>
        <p className="text-gray-600">Delivery #{deliveryId}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <StarRating
            label="How was your overall delivery experience?"
            value={ratings.overall}
            onChange={(value) => handleRatingChange('overall', value)}
          />
          <StarRating
            label="How would you rate your driver?"
            value={ratings.driver}
            onChange={(value) => handleRatingChange('driver', value)}
          />

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What did you like about your delivery? (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {feedbackTags.map((tag, index) => (
                <button
                  key={index}
                  type="button"
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                  }`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Additional comments (optional)
            </label>
            <textarea
              id="comment"
              className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us more about your experience..."
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 flex items-center"
              disabled={!ratings.overall || !ratings.driver}
            >
              <ThumbsUpIcon size={18} className="mr-2" />
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingPage;

import React, { useState } from 'react';
import { StarIcon } from 'lucide-react';
const StarRating = ({
  label,
  onChange,
  value
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const handleMouseOver = rating => {
    setHoverRating(rating);
  };
  const handleMouseLeave = () => {
    setHoverRating(0);
  };
  const handleClick = rating => {
    onChange(rating);
  };
  return <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex">
        {[1, 2, 3, 4, 5].map(rating => <button key={rating} type="button" className="focus-none p-1" onMouseOver={() => handleMouseOver(rating)} onMouseLeave={handleMouseLeave} onClick={() => handleClick(rating)}>
            <StarIcon size={32} fill={(hoverRating || value) >= rating ? '#FBBF24' : 'none'} stroke={(hoverRating || value) >= rating ? '#FBBF24' : '#9CA3AF'} strokeWidth={1.5} className={`transition-colors duration-200 ${(hoverRating || value) >= rating ? 'text-yellow-400' : 'text-gray-400'}`} />
          </button>)}
      </div>
    </div>;
};
export default StarRating;
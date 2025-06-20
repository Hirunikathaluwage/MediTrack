import React from 'react';
import { StarIcon } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      content: 'MediTrack has completely transformed how I manage my medications. The reminders are a lifesaver!',
      author: 'Sarah M.',
      role: 'Patient',
    },
    {
      content: 'The delivery tracking feature gives me peace of mind knowing exactly when my medications will arrive.',
      author: 'James R.',
      role: 'Regular User',
    },
    {
      content: 'Easy to use and incredibly helpful. The customer support team is always there when I need them.',
      author: 'Emily L.',
      role: 'Patient',
    },
  ];

  return (
    <section className="py-20 bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">What Our Users Say</h2>
        <p className="text-lg text-gray-600 mb-12">
          Join thousands of satisfied users who have simplified their healthcare management with MediTrack.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={20} />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
              <div className="font-semibold">{testimonial.author}</div>
              <div className="text-sm text-gray-500">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

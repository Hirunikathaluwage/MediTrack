import React from "react";
import { StarIcon } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      content:
        "The centralized pharmacy saved me so much time—I no longer have to visit multiple stores to find my prescribed medicine.",
      author: "Anjali P.",
      role: "Patient",
    },
    {
      content:
        "As a pharmacist, this system helps me manage stock better and serve patients more efficiently.",
      author: "Dr. Nuwan K.",
      role: "Pharmacist",
    },
    {
      content:
        "Prescription uploads with OCR are a game-changer. We can instantly validate and provide patients with the nearest pharmacy options.",
      author: "Samantha D.",
      role: "Hospital Staff",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">What People Say</h2>
        <p className="text-lg text-gray-600 mb-12">
          Patients, pharmacists, and hospitals are experiencing faster, smarter,
          and more reliable healthcare through our Centralized Pharmacy
          Platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={20} />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "{testimonial.content}"
              </p>
              <div className="font-semibold">{testimonial.author}</div>
              <div className="text-sm text-gray-500">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

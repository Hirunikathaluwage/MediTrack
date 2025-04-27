import React from 'react';
import { CheckCircleIcon, ArrowRightIcon } from 'lucide-react';

export function ServicesSection() {
  const features = [
    {
      title: 'Smart Health Tracking',
      description: 'AI-powered monitoring and personalized insights',
    },
    {
      title: 'Secure Data Management',
      description: 'End-to-end encryption for all your medical records',
    },
    {
      title: 'Instant Communication',
      description: 'Direct line to healthcare providers 24/7',
    },
    {
      title: 'Automated Scheduling',
      description: 'Smart calendar integration for appointments',
    },
  ];

  return (
    <section className="py-20 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">98% Success Rate</h2>
          <p className="text-xl font-semibold text-blue-600 mb-2">
            in Prescription Delivery
          </p>
          <p className="text-lg text-gray-500">24/7 Support - Always Available</p>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-6">Transform Your Healthcare Experience</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the future of healthcare management with our comprehensive platform
            designed for modern medical needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <CheckCircleIcon size={32} className="text-blue-600" />
              <div className="text-left">
                <h4 className="text-xl font-semibold mb-1">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
          Learn More About Our Services <ArrowRightIcon size={20} />
        </button>
      </div>
    </section>
  );
}

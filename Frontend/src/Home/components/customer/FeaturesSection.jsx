import React from 'react';
import { 
  PillIcon, ClockIcon, TruckIcon, 
  HeartPulseIcon, BrainCircuitIcon, 
  ShieldCheckIcon, ActivityIcon, 
  UserCircleIcon 
} from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: <BrainCircuitIcon size={32} />,
      title: 'AI-Powered Health Insights',
      description: 'Advanced analytics and personalized health recommendations powered by artificial intelligence.',
      color: 'from-purple-500 to-blue-500',
    },
    {
      icon: <ClockIcon size={32} />,
      title: 'Real-time Monitoring',
      description: 'Continuous health tracking with instant alerts and notifications for critical changes.',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: <ShieldCheckIcon size={32} />,
      title: 'Secure Health Records',
      description: 'Military-grade encryption ensuring your medical data stays private and protected.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <HeartPulseIcon size={32} />,
      title: 'Personalized Care',
      description: 'Tailored healthcare solutions based on your unique medical history and needs.',
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  const stats = [
    { label: 'Active Users', value: '50,000+' },
    { label: 'Healthcare Providers', value: '1,000+' },
    { label: 'Daily Prescriptions', value: '25,000+' },
    { label: 'Patient Satisfaction', value: '98%' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Next-Generation Healthcare Platform
        </h2>
        <p className="text-lg mb-12 text-gray-600">
          Experience healthcare management reimagined with cutting-edge technology and intuitive design.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-gradient-to-r ${feature.color} p-6 rounded-lg text-white shadow-lg`}
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import {
  PillIcon,
  ClockIcon,
  TruckIcon,
  ShieldCheckIcon,
  ActivityIcon,
  UserCircleIcon,
  FileTextIcon,
  SearchIcon,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <FileTextIcon size={32} />,
      title: "Smart Prescription Upload",
      description:
        "Easily upload prescriptions via OCR scanning with instant validation and digitization.",
      color: "from-purple-500 to-blue-500",
    },
    {
      icon: <SearchIcon size={32} />,
      title: "Medicine Availability",
      description:
        "Check real-time availability of prescribed medicines across multiple pharmacies in one place.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <TruckIcon size={32} />,
      title: "Centralized Pharmacy Network",
      description:
        "Connected pharmacies ensure faster access, delivery options, and reduced stock shortages.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <ShieldCheckIcon size={32} />,
      title: "Secure Health Records",
      description:
        "Encrypted storage of prescriptions and patient history with controlled access.",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const stats = [
    { label: "Partnered Pharmacies", value: "500+" },
    { label: "Prescriptions Processed", value: "100,000+" },
    { label: "Daily Medicine Requests", value: "10,000+" },
    { label: "Patient Satisfaction", value: "97%" },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Centralized Pharmacy Platform
        </h2>
        <p className="text-lg mb-12 text-gray-600">
          A unified system that connects patients, hospitals, and
          pharmacies—making prescription management and medicine access faster,
          smarter, and more reliable.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${feature.color} p-6 rounded-lg text-white shadow-lg`}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-3xl font-bold text-blue-600">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

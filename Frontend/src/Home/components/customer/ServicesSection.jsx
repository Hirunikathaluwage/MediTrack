import React from "react";
import { CheckCircleIcon, ArrowRightIcon } from "lucide-react";

export function ServicesSection() {
  const features = [
    {
      title: "OCR Prescription Upload",
      description:
        "Easily upload handwritten prescriptions with instant digitization and validation.",
    },
    {
      title: "Real-Time Medicine Availability",
      description: "Check stock status across multiple pharmacies in seconds.",
    },
    {
      title: "Connected Pharmacy Network",
      description:
        "Seamless collaboration between pharmacies for faster access to medicines.",
    },
    {
      title: "Delivery & Pickup Options",
      description:
        "Get medicines delivered to your doorstep or reserve them for in-store pickup.",
    },
  ];

  return (
    <section className="py-20 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">
            98% Prescription Fulfillment Rate
          </h2>
          <p className="text-xl font-semibold text-blue-600 mb-2">
            Faster, Smarter & More Reliable
          </p>
          <p className="text-lg text-gray-500">
            24/7 Support - Always Available
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-6">
            Revolutionizing Pharmacy Access
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our centralized pharmacy platform ensures patients get the right
            medicines at the right time by connecting hospitals, pharmacies, and
            patients in a single ecosystem.
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
      </div>
    </section>
  );
}

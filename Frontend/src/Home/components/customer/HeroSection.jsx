import React, { useEffect, useState } from "react";
import { ArrowRightIcon, ChevronDownIcon } from "lucide-react";

export function HeroSection() {
  const [scrolled, setScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/pharmacy_bg_1.png",
    "/pharmacy_bg_2.png",
    "/pharmacy_bg_3.png",
    "/pharmacy_bg_4.png",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const stats = [
    { label: "Partnered Pharmacies", value: "500+" },
    { label: "Prescriptions Processed", value: "100K+" },
    { label: "Daily Medicine Requests", value: "10K+" },
  ];

  return (
    <section className="relative bg-blue-600 text-white py-24 px-6 text-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={images[currentImageIndex]}
          alt="Centralized Pharmacy Background"
          className="w-full h-full object-cover transition-all duration-1000 opacity-20"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">
          <span className="text-yellow-300">
            Welcome to the Centralized Pharmacy Platform
          </span>
        </h2>

        <p className="text-lg mb-8">
          Find your prescribed medicines faster with a connected network of
          pharmacies. Upload prescriptions, check real-time availability, and
          access secure records — all in one place.
        </p>

        <div className="flex justify-center gap-4 mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-4xl font-bold">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <ChevronDownIcon
            size={32}
            className={`transition-transform ${scrolled ? "rotate-180" : ""}`}
          />
        </div>
      </div>
    </section>
  );
}

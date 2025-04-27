import React, { useEffect, useState } from 'react';
import { ArrowRightIcon, ChevronDownIcon } from 'lucide-react';

export function HeroSection() {
  const [scrolled, setScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/ChatGPT_Image_Apr_27%2C_2025%2C_01_58_21_PM.png",
    "/ChatGPT_Image_Apr_27%2C_2025%2C_01_58_23_PM.png",
    "/ChatGPT_Image_Apr_27%2C_2025%2C_01_58_17_PM.png",
    "/ChatGPT_Image_Apr_27%2C_2025%2C_01_58_27_PM.png"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // ✅ Chatbase Bot Script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "myqiFbSTZISwTiYgw5VrQ"; // Your Chatbase Bot ID
    script.setAttribute('domain', 'www.chatbase.co');
    document.body.appendChild(script);

    return () => {
      const addedScript = document.getElementById("myqiFbSTZISwTiYgw5VrQ");
      if (addedScript) {
        document.body.removeChild(addedScript);
      }
    };
  }, []);

  const stats = [
    { label: 'Active Users', value: '50K+' },
    { label: 'Medical Partners', value: '100+' },
    { label: 'Countries', value: '25+' },
  ];

  return (
    <section className="relative bg-blue-600 text-white py-24 px-6 text-center overflow-hidden">

      {/* Background Image with Darker Overlay */}
      <div className="absolute inset-0">
        <img
          src={images[currentImageIndex]}
          alt="MediTrack Background"
          className="w-full h-full object-cover transition-all duration-1000 opacity-20"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-4">Welcome To MediTrack</h1>

        <h2 className="text-3xl font-bold mb-6">
          <span className="text-yellow-300">Future of Pharmaceutical Management</span>
        </h2>

        <p className="text-lg mb-8">
          Experience the revolution in medical care with MediTrack's modernized platform.
          Seamless, secure, and smart healthcare management at your fingertips.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition">
            Browse Pharmaceutical Items <ArrowRightIcon size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-4xl font-bold">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <ChevronDownIcon size={32} className={`transition-transform ${scrolled ? 'rotate-180' : ''}`} />
          <span className="text-sm mt-2">Scroll Down</span>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Mic, ArrowDown } from "lucide-react";
import { AdvancedPharmacyScene } from "./three/AdvancedPharmacyScene";
export const HeroSection = () => {
  const [searchText, setSearchText] = useState("");
  const placeholderText = "Search medicines...";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [{
    url: "\A1.webp",
    title: "Next-Gen Healthcare"
  }, {
    url: "\A2.webp",
    title: "Advanced Medicine"
  }, {
    url: "\A3.webp",
    title: "Future Technology"
  }];
  useEffect(() => {
    if (currentIndex < placeholderText.length) {
      const timeout = setTimeout(() => {
        setSearchText(placeholderText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return <div className="relative min-h-screen bg-gradient-to-b from-blue-900 to-black flex items-center justify-center overflow-hidden">
      <AdvancedPharmacyScene />
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => <motion.div key={index} initial={{
        opacity: 0
      }} animate={{
        opacity: currentImageIndex === index ? 0.15 : 0
      }} transition={{
        duration: 1
      }} className="absolute inset-0">
            <img src={image.url} alt={image.title} className="w-full h-full object-cover" />
          </motion.div>)}
      </div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 text-center">
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="mb-6 inline-block">
          <span className="px-4 py-1 rounded-full bg-white/10 backdrop-blur-xl text-sm font-medium text-white/80">
            Powered by MediTrack
          </span>
        </motion.div>
        <motion.h1 initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-6xl md:text-8xl font-bold text-white mb-6 relative">
          Future of{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            Healthcare
          </span>
          <motion.div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl" animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }} transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }} />
        </motion.h1>
        <motion.p initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }} className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
          Experience the next generation of digital healthcare management with
          AI-powered solutions
        </motion.p>
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }} className="relative max-w-xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex items-center">
              <input type="text" placeholder={searchText} className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <div className="absolute right-2 flex gap-2">
                <button className="p-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full hover:scale-110 transition-transform">
                  <Mic className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full hover:scale-110 transition-transform">
                  <Search className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.6
      }} className="flex justify-center">
          <motion.button whileHover={{
          y: 5
        }} animate={{
          y: [0, 5, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }} className="text-white/50 flex items-center gap-2">
            <span>Scroll to explore</span>
            <ArrowDown className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </div>;
};
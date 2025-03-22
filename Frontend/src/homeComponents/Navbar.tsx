import React from "react";
import { Menu, Search, User } from "lucide-react";
import { motion } from "framer-motion";
export const Navbar = () => {
  return <motion.nav initial={{
    opacity: 0,
    y: -20
  }} animate={{
    opacity: 1,
    y: 0
  }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              MediTrack
            </h1>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Home
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Services
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Search className="w-5 h-5 text-white/80" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <User className="w-5 h-5 text-white/80" />
            </button>
            <button className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors">
              <Menu className="w-5 h-5 text-white/80" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>;
};
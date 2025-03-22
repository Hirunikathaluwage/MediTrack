import React from "react";
import { motion } from "framer-motion";
import { Pill, Droplet, Heart, Shield } from "lucide-react";
export const Categories = () => {
  const categories = [{
    icon: Pill,
    title: "Pain Relief",
    description: "Fast-acting pain relief medications"
  }, {
    icon: Droplet,
    title: "Supplements",
    description: "Daily vitamins and supplements"
  }, {
    icon: Heart,
    title: "Heart Health",
    description: "Cardiovascular care products"
  }, {
    icon: Shield,
    title: "Immunity",
    description: "Boost your immune system"
  }];
  return <section className="py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} className="text-4xl font-bold text-center mb-16">
          Browse Categories
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {categories.map((category, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }} whileHover={{
          scale: 1.05,
          rotateY: 10,
          z: 50
        }} className="group relative bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-8 backdrop-blur-xl
                        hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500
                        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-blue-500/20 before:to-teal-500/20 before:opacity-0 before:transition-opacity hover:before:opacity-100">
              <div className="relative z-10">
                <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-white/60">{category.description}</p>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
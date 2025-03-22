import React from "react";
import { motion } from "framer-motion";
import { Search, Upload, Clock, Check } from "lucide-react";
export const ProcessSteps = () => {
  const steps = [{
    icon: Search,
    title: "Find Medicine",
    description: "Search our extensive database of medications"
  }, {
    icon: Upload,
    title: "Upload Prescription",
    description: "Securely upload your prescription"
  }, {
    icon: Clock,
    title: "Process Order",
    description: "We process your order quickly"
  }, {
    icon: Check,
    title: "Get Delivery",
    description: "Receive your medicine at your doorstep"
  }];
  return <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} className="text-4xl font-bold text-center mb-16">
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.2
        }} className="relative">
              <motion.div whileHover={{
            scale: 1.1,
            rotateY: 180
          }} transition={{
            duration: 0.6
          }} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-white/60">{step.description}</p>
              </motion.div>
              {index < steps.length - 1 && <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />}
            </motion.div>)}
        </div>
      </div>
    </section>;
};
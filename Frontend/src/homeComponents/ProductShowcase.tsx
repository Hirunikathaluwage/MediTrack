import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
export const ProductShowcase = () => {
  const products = [{
    name: "Pain Relief Plus",
    price: "Rs 19.99",
    status: "In Stock",
    image: "/3D.jpg"
  }, {
    name: "Daily Vitamins",
    price: "Rs24.99",
    status: "In Stock",
    image: "/3D.jpg"
  }, {
    name: "Immune Boost",
    price: "Rs 29.99",
    status: "Low Stock",
    image: "/3D.jpg"
  }];
  return <section className="py-20 bg-gradient-to-b from-black to-blue-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} className="text-4xl font-bold text-center mb-12">
          Featured Products
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.2
        }} whileHover={{
          scale: 1.05,
          rotateY: 10,
          z: 50
        }} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 group hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
              <div className="relative h-48 mb-6 overflow-hidden rounded-xl">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-white/60 mb-4">{product.price}</p>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${product.status === "In Stock" ? "text-green-400" : "text-yellow-400"}`}>
                  {product.status}
                </span>
                <button className="p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/40 transition-colors group">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
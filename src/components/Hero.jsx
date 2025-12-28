import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white py-32 px-6 overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl sm:text-6xl font-extrabold text-center drop-shadow-lg"
      >
        We Create. We Brand. We Inspire.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-6 text-center max-w-2xl mx-auto text-lg"
      >
        Your one-stop shop for branding, printing, ICT solutions, and stationery supplies. 
        Let’s bring your ideas to life with creativity and excellence.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mt-10 text-center"
      >
        <a
          href="/services"
          className="bg-white text-purple-600 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          Explore Our Services
        </a>
      </motion.div>

      {/* Decorative Shapes */}
      <div className="absolute w-40 h-40 bg-white opacity-10 rounded-full top-10 left-10"></div>
      <div className="absolute w-56 h-56 bg-white opacity-20 rounded-full bottom-10 right-10"></div>
    </section>
  );
}

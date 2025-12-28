// src/components/Testimonials.jsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Testimonials({ testimonials }) {
  const [, setOffset] = useState(0);
  const containerRef = useRef(null);
  const speed = 1; // scroll speed in pixels per frame

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animationFrame;

    const scroll = () => {
      if (!isHovered && containerRef.current) {
        setOffset(prev => {
          const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
          if (prev >= maxScroll) return 0; // loop back to start
          return prev + speed;
        });
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  return (
    <section className="py-16 bg-gray-100 rounded-lg shadow-md my-12">
      <div className="relative flex items-center justify-center my-12">
        <hr className="border-gray-300 w-1/4" />
        <div className="flex space-x-2 mx-4">
          <span className="w-3 h-3 rounded-full bg-blue-900"></span>
          <span className="w-3 h-3 rounded-full bg-blue-900"></span>
          <span className="w-3 h-3 rounded-full bg-blue-900"></span>
          <span className="w-3 h-3 rounded-full bg-blue-900"></span>
        </div>
        <h2 className="absolute bg-white px-4 text-xl md:text-3xl font-bold text-blue-900">Customer Testimonials</h2>
        <hr className="border-gray-300 w-1/4" />
      </div>

      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-6 overflow-hidden cursor-grab select-none"
      >
        {testimonials.map((testi, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-md text-center flex-shrink-0 w-80 transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex justify-center mb-2">
              {/* Blue stars for rating */}
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-blue-500 inline-block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.067 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                </svg>
              ))}
            </div>
            <p className="italic mb-4">"{testi.feedback}"</p>
            <h3 className="font-semibold">{testi.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

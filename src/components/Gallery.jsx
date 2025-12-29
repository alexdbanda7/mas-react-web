import { useState } from "react";
import { motion } from "framer-motion";

import projectOneImg from "../assets/gallery1.jpg";
import projectTwoImg from "../assets/gallery2.jpg";
import projectThreeImg from "../assets/gallery3.jpg";
import projectFourImg from "../assets/gallery4.jpg";
import projectFiveImg from "../assets/gallery5.jpg";
import projectSixImg from "../assets/gallery6.jpg";

export const galleryImages = [
  { id: 1, img: projectOneImg, title: "Designing and Printing of Flyers", description: "Flyers designed with modern layouts and high-quality printing for events and promotions." },
  { id: 2, img: projectTwoImg, title: "Designing and Branding of T-Shirts", description: "Custom t-shirt designs and branding for corporate and personal events." },
  { id: 3, img: projectThreeImg, title: "Vision and Mission Flyer Design", description: "Creative flyers for presenting company vision and mission statements effectively." },
  { id: 4, img: projectFourImg, title: "Corporate Event Print", description: "Professional printing services for corporate event materials, banners, and invitations." },
  { id: 5, img: projectFiveImg, title: "Promotional Materials", description: "Design and printing of promotional materials to boost marketing campaigns." },
  { id: 6, img: projectSixImg, title: "Nyaso Foundation Branding", description: "Full branding services including logo, print, and digital materials for Nyaso Foundation." },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);

  const nextSlide = () =>
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);

  const prevSlide = () =>
    setActiveIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-extrabold text-center mb-14 text-blue-900"
      >
        Our Gallery
      </motion.h2>

      {/* Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12 },
          },
        }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-6"
      >
        {galleryImages.map((item, index) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group"
            onClick={() => setActiveIndex(index)}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-40 sm:h-52 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center p-3 text-center">
              <p className="text-white text-sm sm:text-base font-semibold mb-3 leading-snug">
                {item.title}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      {activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-auto"
          onClick={() => setActiveIndex(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-6xl bg-black rounded-lg p-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Full Image */}
            <img
              src={galleryImages[activeIndex].img}
              alt={galleryImages[activeIndex].title}
              className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />

            {/* ID, Title, Description */}
            <div className="mt-4 text-center text-white px-4">
              {/* <p className="font-bold text-lg">ID: {galleryImages[activeIndex].id}</p> */}
              <p className="font-semibold text-xl mt-1">{galleryImages[activeIndex].title}</p>
              <p className="mt-2 text-sm sm:text-base">{galleryImages[activeIndex].description}</p>
            </div>

            {/* Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black px-3 py-2 rounded-full shadow"
            >
              ‹
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black px-3 py-2 rounded-full shadow"
            >
              ›
            </button>

            {/* Close */}
            <button
              onClick={() => setActiveIndex(null)}
              className="absolute top-4 right-4 bg-white text-black rounded-full px-3 py-1 font-bold"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

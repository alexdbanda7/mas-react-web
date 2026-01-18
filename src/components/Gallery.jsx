import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://masartngs.com/api/fetch-gallery.php")
      .then((res) => res.json())
      .then((data) => {
        setGalleryImages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const nextSlide = () =>
    setActiveIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );

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
        className="text-3xl sm:text-4xl font-extrabold text-center mb-14 text-gray-800"
      >
        Our Gallery
      </motion.h2>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-600">
          Loading gallery...
        </p>
      )}

      {/* No images */}
      {!loading && galleryImages.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No gallery images available at the moment.
        </p>
      )}

      {/* Grid */}
      {!loading && galleryImages.length > 0 && (
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
                src={`https://masartngs.com${item.image}`}
                alt={item.title}
                className="w-full h-40 sm:h-52 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center p-3 text-center">
                <p className="text-white text-sm sm:text-base font-semibold leading-snug">
                  {item.title}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Modal */}
      {activeIndex !== null && galleryImages[activeIndex] && (
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
            <img
              src={`https://masartngs.com${galleryImages[activeIndex].image}`}
              alt={galleryImages[activeIndex].title}
              className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />

            <div className="mt-4 text-center text-white px-4">
              <p className="font-semibold text-xl mt-1">
                {galleryImages[activeIndex].title}
              </p>
            </div>

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

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ---------- SECTION HEADING ---------- */
function SectionHeading({ children }) {
  return (
    <div className="relative flex items-center justify-center my-14">
      <hr className="border-gray-300 w-1/4" />
      <div className="flex space-x-2 mx-4">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="w-3 h-3 rounded-full bg-blue-900" />
        ))}
      </div>
      <h2 className="absolute bg-white px-4 text-xl md:text-3xl font-bold text-blue-900">
        {children}
      </h2>
      <hr className="border-gray-300 w-1/4" />
    </div>
  );
}

/* ---------- STAR RATING ---------- */
function StarRating({ count = 5 }) {
  return (
    <div className="flex justify-center mb-2">
      {[...Array(count)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.037 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.955z" />
        </svg>
      ))}
    </div>
  );
}

/* ---------- TESTIMONIALS ---------- */
export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const SPEED = 0.5;

  /* ---- Fetch testimonials ---- */
  useEffect(() => {
    fetch("https://masartngs.com/api/testimonials/fetch-testimonials.php")
      .then(res => res.json())
      .then(data => {
        setTestimonials(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("Error fetching testimonials:", err);
        setTestimonials([]);
      })
      .finally(() => setLoading(false));
  }, []);

  /* ---- Auto-scroll animation ---- */
  useEffect(() => {
    const track = trackRef.current;
    if (!track || testimonials.length === 0) return;

    let x = 0;
    const totalWidth = track.scrollWidth / 2;

    const animate = () => {
      if (!isHovering) {
        x -= SPEED;
        if (Math.abs(x) >= totalWidth) x = 0;
        track.style.transform = `translateX(${x}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, [isHovering, testimonials]);

  return (
    <section className="py-20 overflow-hidden">
      {/* ✅ HEADING ALWAYS VISIBLE */}
      <SectionHeading>What Our Clients Say</SectionHeading>

      {/* 🔄 LOADING */}
      {loading && (
        <p className="text-center text-gray-500 py-8">
          Loading testimonials...
        </p>
      )}

      {/* ⚠️ EMPTY STATE */}
      {!loading && testimonials.length === 0 && (
        <p className="text-center text-gray-500 py-8 italic">
          No testimonials available yet.
        </p>
      )}

      {/* ✅ CAROUSEL */}
      {!loading && testimonials.length > 0 && (
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div ref={trackRef} className="flex gap-6 w-max">
            {[...testimonials, ...testimonials].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.08, y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="min-w-[280px] max-w-[280px] bg-white rounded-xl p-6 shadow-md hover:shadow-2xl cursor-pointer"
              >
                <img
                  src={`https://masartngs.com${item.img}`}
                  alt={item.name}
                  className="w-20 h-20 mx-auto rounded-full object-cover mb-4 ring-4 ring-blue-100"
                />

                <StarRating count={item.rating || 5} />

                {/* ✅ FULL TEXT VISIBLE */}
                <p className="text-gray-700 text-sm text-center italic mb-3 whitespace-normal break-words leading-relaxed">
                  “{item.feedback}”
                </p>

                <h4 className="text-blue-900 font-semibold text-center">
                  {item.name}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

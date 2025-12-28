import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ---------- Star Rating ---------- */
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

/* ---------- Testimonials ---------- */
export default function Testimonials({ testimonials }) {
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const SPEED = 0.4; // 🔧 Adjust speed here (0.2 = slow, 1 = fast)

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

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
  }, [isHovering]);

  return (
    <section className="py-20 overflow-hidden">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10 ">
        What Our Clients Say
      </h2>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-6 w-max"
        >
          {[...testimonials, ...testimonials].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.08,
                y: -8,
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="min-w-[280px] max-w-[280px] bg-white rounded-xl p-6 shadow-md hover:shadow-2xl cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-20 h-20 mx-auto rounded-full object-cover mb-4 ring-4 ring-blue-100"
              />

              <StarRating />

              <p className="text-gray-700 text-sm text-center italic mb-3">
                “{item.feedback}”
              </p>

              <h4 className="text-blue-900 font-semibold text-center">
                {item.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

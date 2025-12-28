import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useDrag } from "@use-gesture/react";

import masLogo from "../maslogo.png";
import projectOneImg from "../assets/project1.jpg";
import projectTwoImg from "../assets/project2.jpg";
import projectThreeImg from "../assets/project3.jpg";
import valuesImg from "../assets/values.jpg";
import missionImg from "../assets/mission.png";
import visionImg from "../assets/vision.png";
import iboutImage from "../assets/iboutImage.jpeg";
import iboutImage1 from "../assets/iboutImage1.jpg";
import iboutImage2 from "../assets/iboutImage2.png";
import iboutImage3 from "../assets/iboutImage3.png";
import iboutImage4 from "../assets/iboutImage4.png";
import brochure from "../assets/MAS-Business-Profile.pdf";
import LatestProjects from "../components/LatestProjects";
import Testimonials from "../components/Testimonials";

// Reusable heading component
function SectionHeading({ children }) {
  return (
    <div className="relative flex items-center justify-center my-12">
      <hr className="border-gray-300 w-1/4" />
      <div className="flex space-x-2 mx-4">
        <span className="w-3 h-3 rounded-full bg-blue-900"></span>
        <span className="w-3 h-3 rounded-full bg-blue-900"></span>
        <span className="w-3 h-3 rounded-full bg-blue-900"></span>
        <span className="w-3 h-3 rounded-full bg-blue-900"></span>
      </div>
      <h2 className="absolute bg-white px-4 text-xl md:text-3xl font-bold text-blue-900">
        {children}
      </h2>
      <hr className="border-gray-300 w-1/4" />
    </div>
  );
}

// Star Rating Component

export default function Home() {
  const navigate = useNavigate();
  const scrollRef = useRef();
  const animationRef = useRef();
  const [isHovering] = useState(false);
  const [, setTestimonialIndex] = useState(0);

  const handleBrochureClick = () => {
    if (window.gtag) {
      window.gtag("event", "brochure_download", {
        event_category: "Engagement",
        event_label: "MAS Business Profile",
      });
    }
  };

  const whyChooseUs = [
    { title: "Quality Assurance", text: "Top-tier quality in every product and service we deliver." },
    { title: "Creative Expertise", text: "Our skilled designers bring your vision to life with innovation." },
    { title: "Customer Focus", text: "Your satisfaction is our priority at every step." },
    { title: "Timely Delivery", text: "We meet deadlines reliably and consistently." },
    { title: "Competitive Pricing", text: "Best value without compromising on quality." },
  ];

  const missionAndVision = [
    {
      title: "Mission Statement",
      img: missionImg,
      description:
        "To provide reliable, high-quality business solutions through stationery, ICT support, ICT equipment, electronics, and creative branding and printing services that empower our clients to operate efficiently and grow sustainably.",
    },
    {
      title: "Vision Statement",
      img: visionImg,
      description:
        "To be the leading and trusted one-stop provider of business, technology, and creative solutions in Malawi and beyond, recognized for excellence, innovation, and professionalism.",
    },
    {
      title: "Core Values",
      img: valuesImg,
      description:
        "Driven by creativity, Quality, Integrity, and Customer satisfaction, Mas Art & General Supplies delivers professional design and general supply solutions with a positive community impact.",
    },
  ];

  const latestProjects = [
    { title: "Nyaso Foundation Branding", img: projectOneImg, description: "Branding and identity design completed in 2024." },
    { title: "Posiye Gardens Logo", img: projectTwoImg, description: "Creative logo design project in 2024." },
    { title: "Repose Healthcare UK", img: projectThreeImg, description: "High-quality printing solution delivered in 2025." },
  ];

  const testimonials = [
    { name: "Jeremy Namwali", feedback: "MAS delivered exactly what we needed. Professional and creative!", img: iboutImage },
    { name: "Pauren Nyasoko", feedback: "Their printing and branding exceeded our expectations.", img: iboutImage1 },
    { name: "Mr Mwale", feedback: "Great customer service and attention to detail.", img: iboutImage2 },
    { name: "Anna Chirwa", feedback: "Outstanding quality and timely delivery.", img: iboutImage3 },
    { name: "James Banda", feedback: "Highly recommend MAS for creative services.", img: iboutImage4 },
  ];

  // About Us carousel setup
  const aboutImages = [iboutImage, iboutImage1, iboutImage2, iboutImage3, iboutImage4];
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(prev => (prev + 1) % aboutImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [aboutImages.length]);

  const bind = useDrag(({ swipe: [swipeX] }) => {
    if (swipeX === -1) nextSlide();
    else if (swipeX === 1) prevSlide();
  });

  const nextSlide = () =>
    setSlide((prev) => (prev + 1) % aboutImages.length);
  const prevSlide = () =>
    setSlide((prev) => (prev === 0 ? aboutImages.length - 1 : prev - 1));

  // Auto-scroll testimonials with pause on hover
  useEffect(() => {
    const container = scrollRef.current;
    const speed = 0.5;
    let x = 0;
    const width = container.scrollWidth / 2;

    const animate = () => {
      if (!isHovering) {
        x -= speed;
        if (x <= -width) x = 0;

        container.style.transform = `translateX(${x}px)`;
        const itemWidth = container.scrollWidth / (testimonials.length * 2);
        const currentIndex = Math.floor(-x / itemWidth) % testimonials.length;
        setTestimonialIndex(currentIndex);
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, [isHovering, testimonials.length]);

  // Touch drag for mobile
  useDrag(
    ({ movement: [mx], memo = 0 }) => {
      scrollRef.current.style.transform = `translateX(${memo + mx}px)`;
      return memo + mx;
    },
    { target: scrollRef, axis: "x", pointer: { touch: true } }
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center p-10 md:p-20 bg-gray-100 rounded-lg shadow-md"
      >
        <img
          src={masLogo}
          alt="MAS Logo"
          className="w-56 md:w-80 h-auto mb-6 md:mb-0 md:mr-12 object-contain drop-shadow-md"
        />
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-xl max-w-2xl">
          <h1 className="text-4xl text-center font-bold mb-4 text-blue-900">
            MAS Art & General Supplies
          </h1>
          <p className="text-lg text-center md:text-xl text-gray-700 leading-relaxed">
            We provide comprehensive end-to-end business solutions including stationery and office supplies, ICT support services, ICT equipment and electronics including laptops, printing, branding, advertising, and graphic design.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/services")}
              className="px-7 py-3 bg-blue-900 text-white rounded-lg shadow-lg hover:bg-blue-800 transition transform hover:scale-105"
            >
              View Services
            </button>

            <a
              href={brochure}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleBrochureClick}
              className="px-7 py-3 border-2 border-blue-900 text-blue-900 rounded-lg shadow-lg hover:bg-blue-900 hover:text-white transition transform hover:scale-105 text-center"
            >
              View Company Profile
            </a>
          </div>
        </div>
      </motion.section>

      {/* About Us Carousel */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-16 bg-gray-100 rounded-lg shadow-md my-12"
      >
        <div className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-12">

          {/* Text */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">About Us</h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
              MAS Art & General Supplies is a dynamic and forward-thinking company providing complete business solutions. Our services include office and school stationery, ICT support and equipment, electronics including laptops, printing, branding, advertising, and graphic design.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              We are driven by quality, professionalism, and customer satisfaction. MAS Art & General Supplies is registered under the Malawi Business Registration Act (No. 12 of 2012) and recognized by the Government of Malawi.
            </p>
          </div>

          {/* Carousel */}
          <div
            {...bind()}
            className="md:w-1/2 relative w-full h-80 rounded-lg overflow-hidden shadow-lg cursor-grab"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={slide}
                src={aboutImages[slide]}
                alt="About MAS"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded-full"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded-full"
            >
              ›
            </button>
          </div>
        </div>
      </motion.section>

      {/* Mission, Vision, Values */}
      <section className="py-16">
        <SectionHeading>Mission, Vision, Values</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {missionAndVision.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded shadow hover:shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer"
            >
              <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <SectionHeading>Why Choose Us</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {whyChooseUs.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-blue-900 text-white p-6 rounded-lg text-center transform transition duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
              <p className="text-sm opacity-90">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Latest Projects */}
      <LatestProjects projects={latestProjects} />

      {/* Testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* CTA */}
      <section className="bg-blue-900 text-white py-16 text-center rounded-lg my-10">
        <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
        <p className="mb-6">Have a project? Let us help bring it to life.</p>
        <button
          onClick={() => navigate("/contact")}
          className="px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:scale-105 transition transform"
        >
          Contact Us
        </button>
      </section>
    </div>
  );
}

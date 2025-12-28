import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
import badge1 from "../assets/badge1.png";
import badge2 from "../assets/badge2.png";
import badge3 from "../assets/badge3.png";
import brochure from "../assets/MAS-Business-Profile.pdf";

import LatestProjects from "../components/LatestProjects";
import Testimonials from "../components/Testimonials";

/* ---------------- SECTION HEADING ---------------- */
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

/* ---------------- HOME ---------------- */
export default function Home() {
  const navigate = useNavigate();

  /* -------- ABOUT US CAROUSEL -------- */
  const aboutImages = [
    { src: iboutImage, alt: "MAS Team at office" },
    { src: iboutImage1, alt: "MAS team working on projects" },
    { src: iboutImage2, alt: "Creative design workflow" },
    { src: iboutImage3, alt: "Printing and branding setup" },
    { src: iboutImage4, alt: "Satisfied clients and staff" },
  ];

  const [slide, setSlide] = useState(0);
  const [showMore, setShowMore] = useState(false);

  /* Auto-slide every 5s */
  useEffect(() => {
    const timer = setInterval(
      () => setSlide((prev) => (prev + 1) % aboutImages.length),
      5000
    );
    return () => clearInterval(timer);
  }, [aboutImages.length]);

  /* Swipe gesture */
  const bind = useDrag(({ swipe: [swipeX] }) => {
    if (swipeX === -1) setSlide((s) => (s + 1) % aboutImages.length);
    if (swipeX === 1) setSlide((s) => (s === 0 ? aboutImages.length - 1 : s - 1));
  });

  /* -------- HERO DATA -------- */
  const latestProjects = [
    {
      title: "Nyaso Foundation Branding",
      img: projectOneImg,
      description: "Branding and identity design completed in 2024.",
    },
    {
      title: "Posiye Gardens Logo",
      img: projectTwoImg,
      description: "Creative logo design project in 2024.",
    },
    {
      title: "Repose Healthcare UK",
      img: projectThreeImg,
      description: "High-quality printing solution delivered in 2025.",
    },
  ];

  const testimonials = [
    {
      name: "Jeremy Namwali",
      feedback: "MAS delivered exactly what we needed. Professional and creative!",
      img: iboutImage,
    },
    {
      name: "Pauren Nyasoko",
      feedback: "Their printing and branding exceeded our expectations.",
      img: iboutImage1,
    },
    {
      name: "Mr Mwale",
      feedback: "Great customer service and attention to detail.",
      img: iboutImage2,
    },
    {
      name: "Anna Chirwa",
      feedback: "Outstanding quality and timely delivery.",
      img: iboutImage3,
    },
    {
      name: "James Banda",
      feedback: "Highly recommend MAS for creative services.",
      img: iboutImage4,
    },
  ];

  /* -------- MISSION / VISION DATA -------- */
  const missionAndVision = [
    {
      title: "Mission Statement",
      img: missionImg,
      description:
        "To provide reliable, high-quality business solutions through stationery, ICT support, ICT equipment, electronics, and creative branding and printing services.",
    },
    {
      title: "Vision Statement",
      img: visionImg,
      description:
        "To be the leading and trusted one-stop provider of business and creative solutions in Malawi and beyond.",
    },
    {
      title: "Core Values",
      img: valuesImg,
      description:
        "Creativity, Quality, Integrity, and Customer Satisfaction guide everything we do.",
    },
  ];

  const whyChooseUs = [
    { title: "Quality Assurance", text: "Top-tier quality guaranteed." },
    { title: "Creative Expertise", text: "Innovative and modern designs." },
    { title: "Customer Focus", text: "Your satisfaction comes first." },
    { title: "Timely Delivery", text: "We meet deadlines consistently." },
    { title: "Competitive Pricing", text: "Best value for your budget." },
  ];

  const certificationBadges = [
    { src: badge1, alt: "ISO Certified" },
    { src: badge2, alt: "Malawi Business Registration" },
    { src: badge3, alt: "Quality Assurance Award" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
      {/* ---------------- HERO ---------------- */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center p-10 md:p-20 bg-gray-100 rounded-lg shadow-md"
      >
        <img
          src={masLogo}
          alt="MAS Art & General Supplies Logo"
          className="w-56 md:w-80 mb-6 md:mr-12"
        />

        <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl">
          <h1 className="text-4xl text-center font-bold mb-4 text-blue-900">
            MAS Art & General Supplies
          </h1>

          <p className="text-lg text-center text-gray-700">
            We provide comprehensive end-to-end business solutions including stationery and office supplies, ICT support services, ICT equipment and electronics including laptops, printing, branding, advertising, and graphic design. Our commitment to quality, reliability, and professionalism ensures your business is equipped for success.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/services")}
            className="px-5 sm:px-7 py-2 sm:py-3 bg-blue-900 text-white rounded-lg shadow-lg hover:bg-blue-800 transition transform hover:scale-105 text-sm sm:text-base"
          >
            View Services
          </button>

          <a
            href={brochure}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 sm:px-7 py-2 sm:py-3 border-2 border-blue-900 text-blue-900 rounded-lg shadow-lg hover:bg-blue-900 hover:text-white transition transform hover:scale-105 text-sm sm:text-base text-center"
          >
            View Company Profile
          </a>
        </div>
        </div>
      </motion.section>

      {/* ---------------- ABOUT US CAROUSEL ---------------- */}
      <motion.section className="py-16 bg-gray-100 rounded-lg shadow-md my-14">
        <div className="flex flex-col md:flex-row gap-10 px-6 md:px-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">About Us</h2>

            <p
              className={`text-base md:text-lg text-gray-700 leading-relaxed mb-6 ${
                !showMore ? "line-clamp-4 sm:line-clamp-none" : ""
              }`}
            >
              MAS Art & General Supplies is a dynamic and forward-thinking company
              providing complete business solutions. Our services include office and
              school stationery, ICT support services, ICT equipment and electronics
              including laptops, printing, branding, advertising, and graphic design.
            </p>

            <p
              className={`text-base md:text-lg text-gray-700 leading-relaxed ${
                !showMore ? "line-clamp-4 sm:line-clamp-none" : ""
              }`}
            >
              We are driven by quality, professionalism, and customer satisfaction.
              MAS Art & General Supplies is registered under the Malawi Business
              Registration Act (No. 12 of 2012) and is officially recognized by the
              Government of Malawi.
            </p>

            {/* Read More button only on small screens */}
            <button
              className="sm:hidden mt-2 text-blue-900 font-semibold"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Read Less" : "Read More"}
            </button>
          </div>

          {/* Carousel */}
          <div {...bind()} className="md:w-1/2 relative h-80 rounded-lg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={slide}
                src={aboutImages[slide].src}
                alt={aboutImages[slide].alt}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
              />
            </AnimatePresence>

            {/* Prev / Next buttons */}
            <button
              onClick={() => setSlide((s) => (s === 0 ? aboutImages.length - 1 : s - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded-full"
            >
              ‹
            </button>
            <button
              onClick={() => setSlide((s) => (s + 1) % aboutImages.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded-full"
            >
              ›
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
              {aboutImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-3 h-3 rounded-full ${
                    slide === idx ? "bg-blue-900" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Certification Badges */}
        <div className="flex justify-center gap-6 mt-8 flex-wrap">
          {certificationBadges.map((badge, idx) => (
            <img
              key={idx}
              src={badge.src}
              alt={badge.alt}
              className="h-16 w-auto object-contain"
            />
          ))}
        </div>
      </motion.section>

      {/* ---------------- MISSION / VISION ---------------- */}
      <section className="py-16">
        <SectionHeading>Mission, Vision & Values</SectionHeading>
        <div className="grid md:grid-cols-3 gap-6">
          {missionAndVision.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded shadow hover:scale-105 transition"
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- WHY CHOOSE US ---------------- */}
      <section className="py-16">
        <SectionHeading>Why Choose Us</SectionHeading>
        <div className="grid md:grid-cols-5 gap-6">
          {whyChooseUs.map((item, i) => (
            <div
              key={i}
              className="bg-blue-900 text-white p-6 rounded-lg hover:scale-105 transition"
            >
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- PROJECTS ---------------- */}
      <LatestProjects projects={latestProjects} />

      {/* ---------------- TESTIMONIALS ---------------- */}
      <Testimonials testimonials={testimonials} />

      {/* ---------------- CTA ---------------- */}
      <section className="bg-blue-900 text-white py-16 text-center rounded-lg my-10">
        <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
        <p className="mb-6">Have a project? Let us help bring it to life.</p>
        <button
          onClick={() => navigate("/contact")}
          className="px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:scale-105 transition"
        >
          Contact Us
        </button>
      </section>
    </div>
  );
}

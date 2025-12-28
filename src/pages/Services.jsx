import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Icons
import stationeryIcon from "../assets/stationery.png";
import graphicDesignIcon from "../assets/graphic-design.png";
import printingIcon from "../assets/printing.png";
import brandingIcon from "../assets/branding.png";
import ictTrainingIcon from "../assets/ict-training.png";
import computerRepairIcon from "../assets/computer-repair.png";
import otherServicesIcon from "../assets/other-services.png";

const services = [
  { 
    id: "stationery-supplies", 
    name: "Stationery & Office Supplies", 
    icon: stationeryIcon, 
    slogan: "Essential Supplies. Efficient Workspaces." 
  },
  { 
    id: "graphic-design", 
    name: "Graphic Design", 
    icon: graphicDesignIcon, 
    slogan: "Creative Designs That Communicate and Inspire." 
  },
  { 
    id: "printing", 
    name: "Printing Services", 
    icon: printingIcon, 
    slogan: "Precision Printing That Brings Ideas to Life." 
  },
  { 
    id: "branding", 
    name: "Branding & Advertising", 
    icon: brandingIcon, 
    slogan: "Build a Strong Brand. Leave a Lasting Impression." 
  },
  { 
    id: "ict-training", 
    name: "ICT Support & Training", 
    icon: ictTrainingIcon, 
    slogan: "Smart Technology Solutions for Modern Businesses." 
  },
  { 
    id: "computer-repair", 
    name: "Computer Repair & Maintenance", 
    icon: computerRepairIcon, 
    slogan: "Reliable Repairs. Maximum Performance." 
  },
  { 
    id: "other-services", 
    name: "Electronics & Other Services", 
    icon: otherServicesIcon, 
    slogan: "Flexible Solutions Tailored to Your Business Needs." 
  },
];


export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 max-w-7xl mx-auto px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl sm:text-5xl font-bold text-center mb-6 text-black"
      >
        Our Main Services </motion.h1>
      <div><p className="py-4 text-center">Reliable business solutions. Trusted technology. Professional results.</p></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="rounded-xl p-6 bg-gray-200 shadow-lg hover:shadow-xl transition cursor-pointer"
            onClick={() => navigate(`/services/${service.id}`)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -8 }}
          >
            <img src={service.icon} alt={service.name} className="w-28 h-28 mx-auto mb-4" />

            <h2 className="text-xl font-bold text-center mb-2 text-black">{service.name}</h2>
            <p className="text-sm font-semibold text-center text-black">{service.slogan}</p>

            <button
              className="mt-6 block mx-auto px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/services/${service.id}`);
              }}
            >
              Learn More
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

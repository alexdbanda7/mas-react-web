import { useParams, useNavigate } from "react-router-dom";

// Icons
import stationeryIcon from "../assets/stationery.png";
import graphicDesignIcon from "../assets/graphic-design.png";
import printingIcon from "../assets/printing.png";
import brandingIcon from "../assets/branding.png";
import ictTrainingIcon from "../assets/ict-training.png";
import computerRepairIcon from "../assets/computer-repair.png";
import otherServicesIcon from "../assets/other-services.png";

const servicesData = {
  "stationery-supplies": {
    name: "Stationery & Office Supplies",
    icon: stationeryIcon,
    description: [
      "We provide a complete range of office and school stationery, including pens, paper, files, and corporate office sets. Affordable bulk and retail options make it easy to equip your workspace efficiently. Branded diaries, notebooks, lanyards, and ID cards are also available to professionally showcase your brand."
    ],
    images: [],
  },
  "graphic-design": {
    name: "Graphic Design",
    icon: graphicDesignIcon,
    description: [
      "Our graphic design services create visuals that communicate and inspire. From logos and business cards to brochures, flyers, and social media ads, we strengthen your brand identity. Every project is crafted to deliver high-impact results and a professional appearance."
    ],
    images: [],
  },
  "printing": {
    name: "Printing Services",
    icon: printingIcon,
    description: [
      "We deliver high-quality printing solutions for marketing, events, business branding, and office needs. Services include digital printing, banners, posters, brochures, booklets, stickers, and magazines. Expect vibrant colors, long-lasting quality, and fast turnaround on every project."
    ],
    images: [],
  },
  "branding": {
    name: "Branding & Advertising",
    icon: brandingIcon,
    description: [
      "We help businesses transform into memorable brands through strategic design and visual identity development. Our solutions include corporate wear, vehicle branding, promotional materials, and signage. We focus on helping you stand out while communicating your story professionally."
    ],
    images: [],
  },
  "ict-training": {
    name: "ICT Support & Training",
    icon: ictTrainingIcon,
    description: [
      "We provide ICT training and support for individuals, corporate teams, schools, and government institutions. Programs include Data Entry, Graphic Design, Cyber Security Awareness, MS Office, Networking, and Web Design. Participants gain practical skills, with certificates provided upon completion."
    ],
    images: [],
  },
  "computer-repair": {
    name: "Computer Repair & Maintenance",
    icon: computerRepairIcon,
    description: [
      "Our team offers expert diagnostics, maintenance, and repair for laptops, desktops, and office equipment. Services include virus removal, data recovery, hardware replacement, software upgrades, and performance tuning. Fast, reliable, and secure support ensures your devices operate smoothly."
    ],
    images: [],
  },
  "other-services": {
    name: "Electronics & Additional Services",
    icon: otherServicesIcon,
    description: [
      "We provide a range of business solutions including ICT equipment and electronics, document management services such as photocopying, scanning, lamination, and binding, as well as digital marketing and corporate consultancy. Tailored solutions are available on request, delivered with professionalism, reliability, and a focus on enhancing your business efficiency."
    ],
    images: [],
  },
};

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = servicesData[serviceId];

  if (!service) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">Service Not Found</h2>
        <button
          onClick={() => navigate("/services")}
          className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
        >
          Back to Services
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 max-w-4xl mx-auto px-6 py-14">
      <button
        onClick={() => navigate("/services")}
        className="mb-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
      >
        ← Back to Services
      </button>

      <div className="flex flex-col items-center text-center">
        <img src={service.icon} alt={service.name} className="w-24 h-24 mb-4" />
        <h1 className="text-3xl font-bold mb-6 text-black">{service.name}</h1>

        <ul className="mb-8 text-left list-disc list-inside">
          {service.description.map((desc, idx) => (
            <li key={idx} className="text-black leading-relaxed">{desc}</li>
          ))}
        </ul>

        {service.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {service.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${service.name} ${idx + 1}`}
                className="rounded shadow max-h-64 object-cover"
              />
            ))}
          </div>
        )}

        <button
          onClick={() => navigate("/services/business-plan")}
          className="mt-4 px-6 py-3 bg-blue-700 text-white font-semibold rounded shadow-lg hover:bg-blue-800 transition"
        >
          Request Quote
        </button>
      </div>
    </div>
  );
}

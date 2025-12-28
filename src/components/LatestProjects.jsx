// src/components/LatestProjects.jsx
import { motion } from "framer-motion";

export default function LatestProjects({ projects }) {
  return (
    <section className="py-16">
      <div className="relative flex items-center justify-center my-12">
        <hr className="border-gray-300 w-1/4" />
        <div className="flex space-x-2 mx-4">
          <span className="w-3 h-3 rounded-full bg-blue-900"></span>
          <span className="w-3 h-3 rounded-full bg-blue-900"></span>
          <span className="w-3 h-3 rounded-full bg-blue-900"></span>
          <span className="w-3 h-3 rounded-full bg-blue-900"></span>
        </div>
        <h2 className="absolute bg-white px-4 text-xl md:text-3xl font-bold text-blue-900">Latest Projects</h2>
        <hr className="border-gray-300 w-1/4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded shadow overflow-hidden hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2"
          >
            <img src={project.img} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-700 text-sm">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

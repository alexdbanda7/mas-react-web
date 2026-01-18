import { useEffect, useState } from "react";
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

export default function LatestProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://masartngs.com/api/fetch-projects.php")
      .then(res => res.json())
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("Projects fetch error:", err);
        setProjects([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20">
      {/* ✅ HEADING ALWAYS VISIBLE */}
      <SectionHeading>Latest Projects</SectionHeading>

      {/* 🔄 LOADING */}
      {loading && (
        <p className="text-center text-gray-500 py-10">
          Loading projects...
        </p>
      )}

      {/* ⚠️ EMPTY STATE */}
      {!loading && projects.length === 0 && (
        <p className="text-center text-gray-500 py-10 italic">
          No projects available at the moment.
        </p>
      )}

      {/* ✅ PROJECTS GRID */}
      {!loading && projects.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl"
            >
              <img
                src={`https://masartngs.com${project.image}`}
                alt={project.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold text-blue-900">
                  {project.title}
                </h3>

                {project.description && (
                  <p className="text-gray-600 text-sm mt-2">
                    {project.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://masartngs.com/api/fetch-services.php")
      .then((res) => res.json())
      .then((data) => {
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 font-semibold">
        Loading services...
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">

        
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Our Main Services
        </h2>

        <p className="py-4 text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Reliable business solutions. Trusted technology. Professional results.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-center"
            >
              <img
                src={`https://masartngs.com${service.icon}`}
                alt={service.title}
                className="w-16 h-16 mx-auto mb-4 object-contain"
              />

              <h3 className="text-xl font-semibold mb-2">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {service.description}
              </p>

              <button
                onClick={() => navigate(`/services/${service.slug}`)}
                className="mt-2 px-4 py-2 bg-blue-700 text-white text-sm rounded hover:bg-blue-800 transition"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ServiceDetails() {
  const { serviceId } = useParams(); // this is the slug
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://masartngs.com/api/fetch-services.php")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(
          (item) => item.slug === serviceId
        );
        setService(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [serviceId]);

  if (loading) {
    return (
      <div className="p-10 text-center font-semibold">
        Loading service...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Service Not Found
        </h2>
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
        <img
          src={`https://masartngs.com${service.icon}`}
          alt={service.title}
          className="w-24 h-24 mb-4 object-contain"
        />

        <h1 className="text-3xl font-bold mb-6 text-black">
          {service.title}
        </h1>

        <p className="text-black leading-relaxed mb-8">
          {service.longDescription}
        </p>

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

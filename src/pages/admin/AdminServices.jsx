import { useEffect, useState } from "react";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = () => {
    fetch("https://masartngs.com/api/fetch-services.php")
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    const formData = new FormData();
    formData.append("id", id);

    const res = await fetch(
      "https://masartngs.com/api/delete-service.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.success) {
      setServices(prev => prev.filter(s => s.id !== id));
    } else {
      alert(data.error);
    }
  };

  if (loading) return <p>Loading services...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Manage Services</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Icon</th>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {services.map(service => (
            <tr key={service.id} className="border-t">
              <td className="p-2">
                <img
                  src={`https://masartngs.com${service.icon}`}
                  className="w-10 h-10"
                />
              </td>

              <td className="p-2">{service.title}</td>

              <td className="p-2">
                <button
                  onClick={() => deleteService(service.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

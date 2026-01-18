import { useEffect, useState } from "react";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = () => {
    fetch("https://masartngs.com/api/testimonials/fetch-testimonials.php")
      .then(res => res.json())
      .then(data => {
        setTestimonials(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const deleteTestimonial = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;

    const formData = new FormData();
    formData.append("id", id);

    const res = await fetch(
      "https://masartngs.com/api/testimonials/delete-testimonial.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.success) {
      setTestimonials(prev => prev.filter(t => t.id !== id));
    } else {
      alert(data.error);
    }
  };

  if (loading) return <p>Loading testimonials...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Manage Testimonials</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Client</th>
            <th className="p-2 text-left">Message</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {testimonials.map(t => (
            <tr key={t.id} className="border-t">
              <td className="p-2 font-medium">{t.name}</td>
              <td className="p-2 text-sm text-gray-600 line-clamp-2">
                {t.feedback}
              </td>
              <td className="p-2">
                <button
                  onClick={() => deleteTestimonial(t.id)}
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

import { useEffect, useState } from "react";

export default function AdminGallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = () => {
    fetch("https://masartngs.com/api/fetch-gallery.php")
      .then((res) => res.json())
      .then((data) => {
        setGallery(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const deleteGalleryItem = async (id) => {
    if (!window.confirm("Delete this gallery image?")) return;

    const formData = new FormData();
    formData.append("id", id);

    const res = await fetch(
      "https://masartngs.com/api/delete-gallery.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.success) {
      setGallery((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert(data.error || "Failed to delete image");
    }
  };

  if (loading) {
    return <p className="text-center">Loading gallery...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">
        Manage Gallery
      </h2>

      {gallery.length === 0 ? (
        <p className="text-gray-500">No gallery images found.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {gallery.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">
                  <img
                    src={`https://masartngs.com${item.image}`}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                <td className="p-2">
                  {item.title}
                </td>

                <td className="p-2">
                  <button
                    onClick={() => deleteGalleryItem(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

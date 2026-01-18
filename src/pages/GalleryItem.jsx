import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function GalleryItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://masartngs.com/api/fetch-gallery.php")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(
          (img) => Number(img.id) === Number(id)
        );
        setItem(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 font-semibold">
        Loading image...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="text-center py-20 font-semibold text-red-600">
        Gallery item not found
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <button
        onClick={() => navigate("/gallery")}
        className="mb-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
      >
        ← Back to Gallery
      </button>

      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold mb-6 text-black">
          {item.title}
        </h1>

        <img
          src={`https://masartngs.com${item.image}`}
          alt={item.title}
          className="w-full max-w-4xl h-auto rounded-lg shadow-lg"
        />

        {item.description && (
          <p className="mt-6 text-gray-700 max-w-3xl">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

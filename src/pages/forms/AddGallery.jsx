import { useState } from "react";

export default function AddGallery() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please select an image");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const res = await fetch(
        "https://masartngs.com/api/add-gallery.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Upload failed");
      }

      setMessage("Gallery image added successfully ✅");
      setTitle("");
      setDescription("");
      setImage(null);
      e.target.reset();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Add Gallery Image
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Image title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded px-4 py-2"
        />

        <textarea
          placeholder="Image description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="w-full border rounded px-4 py-2"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
          className="w-full"
        />

        {message && (
          <p className="text-center text-sm text-red-600">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Add to Gallery"}
        </button>
      </form>
    </div>
  );
}

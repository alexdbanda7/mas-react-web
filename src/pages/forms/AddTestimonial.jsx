import { useState } from "react";

export default function AddTestimonial() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!name || !message || !image) {
      setStatus("❌ All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("message", message);
    formData.append("rating", rating);
    formData.append("image", image);

    try {
      setLoading(true);

      const res = await fetch(
        "https://masartngs.com/api/testimonials/upload-testimonial.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Upload failed");
      }

      setStatus("✅ Testimonial added successfully!");
      setName("");
      setMessage("");
      setRating(5);
      setImage(null);
      e.target.reset();
    } catch (err) {
      setStatus("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Add Testimonial</h2>

      {status && (
        <div className="mb-4 text-sm font-medium text-center">
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Client Name */}
        <div>
          <label className="block font-medium mb-1">
            Client Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Client name"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block font-medium mb-1">
            Testimonial Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded px-3 py-2 h-28 resize-none"
            placeholder="What did the client say?"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block font-medium mb-1">
            Rating
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          >
            <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
            <option value={4}>⭐⭐⭐⭐ (4)</option>
            <option value={3}>⭐⭐⭐ (3)</option>
            <option value={2}>⭐⭐ (2)</option>
            <option value={1}>⭐ (1)</option>
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium mb-1">
            Client Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Add Testimonial"}
        </button>
      </form>
    </div>
  );
}

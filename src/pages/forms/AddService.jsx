import { useState } from "react";

export default function AddService() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(null);
  const [longDescription, setLongDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!icon) {
      setMessage("❌ Please select an icon");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("longDescription", longDescription);
      formData.append("icon", icon);

      const res = await fetch("https://masartngs.com/api/add-service.php", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        setMessage("❌ " + data.error);
      } else {
        setMessage("✅ Service added successfully");
        setTitle("");
        setDescription("");
        setIcon(null);
        e.target.reset();
      }
    } catch {
      setMessage("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start w-full">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-900">
          Add New Service
        </h2>

        {message && (
          <p className="text-center mb-6 font-semibold text-blue-700">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Service Title
            </label>
            <input
              type="text"
              placeholder="Service title"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Short Description
            </label>
            <textarea
              placeholder="Short service description"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Long Description */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Long Description
            </label>
            <textarea
              placeholder="Long service description"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              rows="5"
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              required
            />
          </div>

          {/* Icon Upload */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Service Icon
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-lg px-4 py-2 bg-gray-50"
              onChange={(e) => setIcon(e.target.files[0])}
              required
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

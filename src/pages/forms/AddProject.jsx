// src/admin/AddProject.jsx
import { useState } from "react";

const API_BASE = "https://masartngs.com";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image) {
      setMessage("All fields are required");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const res = await fetch(`${API_BASE}/api/upload-project.php`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✅ Project added successfully");
        setTitle("");
        setDescription("");
        setImage(null);
        document.getElementById("imageInput").value = "";
      } else {
        setMessage(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start w-full">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-900 text-center">
          Add New Project
        </h2>

        {message && (
          <p className="mb-6 text-sm text-center text-blue-700">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter project title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              placeholder="Write a short project description"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Project Image
            </label>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border rounded-lg px-4 py-2 bg-gray-50"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold
              hover:bg-blue-800 transition disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

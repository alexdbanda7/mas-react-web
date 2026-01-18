import { useEffect, useState } from "react";

const API_BASE = "https://masartngs.com";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/fetch-projects.php`);
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Fetch failed", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const deleteProject = async (id) => {
    if (!window.confirm("Delete project?")) return;

    const fd = new FormData();
    fd.append("id", id);

    await fetch(`${API_BASE}/api/delete-project.php`, {
      method: "POST",
      body: fd,
    });

    setProjects(prev => prev.filter(p => p.id !== id));
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Manage Projects</h2>

      {projects.length === 0 && <p>No projects found.</p>}

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Image</th>
            <th className="p-2">Title</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {projects.map(p => (
            <tr key={p.id} className="border-t">
              <td className="p-2">
                <img
                  src={`${API_BASE}${p.image}`}
                  alt={p.title}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="p-2">{p.title}</td>
              <td className="p-2">
                <button
                  onClick={() => deleteProject(p.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
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

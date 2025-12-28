import { useState } from "react";

export default function DashboardLogin({ onSuccess }) {
  const [password, setPassword] = useState("");
  // Change to your password
  const DASHBOARD_PASSWORD = "Admin@123";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === DASHBOARD_PASSWORD) {

      // Notify parent App that login succeeded
      onSuccess(); 
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 mt-20 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">Dashboard Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

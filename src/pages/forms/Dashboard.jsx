import { useEffect, useState } from "react";
import jsPDF from "jspdf";

export default function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("dateDesc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // LOGIN STATE
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const DASHBOARD_PASSWORD = "Admin@123";

  // SAFE LOADING
  useEffect(() => {
    if (!isAuthenticated) return;

    try {
      const raw = localStorage.getItem("serviceRequests");

      if (!raw) {
        setRequests([]);
        return;
      }

      const parsed = JSON.parse(raw);

      if (!Array.isArray(parsed)) {
        console.warn("Corrupted dashboard data. Resetting.");
        localStorage.setItem("serviceRequests", "[]");
        setRequests([]);
        return;
      }

      setRequests([...parsed].reverse());
    } catch (err) {
      console.error("Dashboard load error:", err);
      localStorage.setItem("serviceRequests", "[]");
      setRequests([]);
    }
  }, [isAuthenticated]);

  // HANDLE LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === DASHBOARD_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  // FILTERED + SORTED
  const filtered = requests.filter((req) => {
    const matchesFilter = filter === "all" || req.serviceType === filter;
    const matchesSearch =
      search === "" ||
      req.name?.toLowerCase().includes(search.toLowerCase()) ||
      req.email?.toLowerCase().includes(search.toLowerCase()) ||
      req.serviceType?.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "nameAsc":
        return a.name.localeCompare(b.name);
      case "nameDesc":
        return b.name.localeCompare(a.name);
      case "serviceAsc":
        return a.serviceType.localeCompare(b.serviceType);
      case "serviceDesc":
        return b.serviceType.localeCompare(a.serviceType);
      case "dateAsc":
        return new Date(a.date) - new Date(b.date);
      case "dateDesc":
        return new Date(b.date) - new Date(a.date);
      default:
        return 0;
    }
  });

  // PAGINATION
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = sorted.slice(start, start + itemsPerPage);

  const deleteRequest = (index) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    const absoluteIndex = start + index;
    const updated = [...requests];
    updated.splice(absoluteIndex, 1);
    localStorage.setItem("serviceRequests", JSON.stringify(updated));
    setRequests(updated);
  };

  const clearAll = () => {
    if (!window.confirm("Clear ALL service requests? This cannot be undone!")) return;
    localStorage.setItem("serviceRequests", "[]");
    setRequests([]);
  };

  const downloadCSV = () => {
    if (sorted.length === 0) {
      alert("No data to download.");
      return;
    }

    const columns = [
      "Date", "Name", "Email", "Service Type",
      "Owner Type", "Business Name", "Business Address", "Business Email", "Business Phone",
      "Products/Services", "Target Market", "Competitors", "Marketing Strategy",
      "Financial Overview", "Estimated Revenue", "Estimated Expenses", "Funding Needed",
      "Conclusion",
      "Design Items", "Design Other", "Print Quantity", "Print Size",
      "Print Paper", "Print Color", "Expected Delivery", "Design Notes", "Design File",
      "Training Type", "Training Duration", "Training Location", "Training Notes",
      "Device Type", "Device Brand", "Device Model", "Issue Description", "Repair File",
      "Other Service Description"
    ];

    const csvRows = [];
    csvRows.push(columns.join(","));

    sorted.forEach((req) => {
      const row = [
        `"${new Date(req.date).toLocaleString()}"`,
        `"${req.name || ""}"`,
        `"${req.email || ""}"`,
        `"${req.serviceType || ""}"`,
        `"${req.ownerType || ""}"`,
        `"${req.businessName || ""}"`,
        `"${req.businessAddress || ""}"`,
        `"${req.businessEmail || ""}"`,
        `"${req.businessPhone || ""}"`,
        `"${req.productsServices || ""}"`,
        `"${req.targetMarket || ""}"`,
        `"${req.competitors || ""}"`,
        `"${req.marketingStrategy || ""}"`,
        `"${req.financialOverview || ""}"`,
        `"${req.estimatedRevenue || ""}"`,
        `"${req.estimatedExpenses || ""}"`,
        `"${req.fundingNeeded || ""}"`,
        `"${req.conclusion || ""}"`,
        `"${(req.designItems || []).join(";")}"`,
        `"${req.designOther || ""}"`,
        `"${req.printQuantity || ""}"`,
        `"${req.printSize || ""}"`,
        `"${req.printPaper || ""}"`,
        `"${req.printColor || ""}"`,
        `"${req.expectedDelivery || ""}"`,
        `"${req.designNotes || ""}"`,
        `"${req.designFile || ""}"`,
        `"${req.trainingType || ""}"`,
        `"${req.trainingDuration || ""}"`,
        `"${req.trainingLocation || ""}"`,
        `"${req.trainingNotes || ""}"`,
        `"${req.deviceType || ""}"`,
        `"${req.deviceBrand || ""}"`,
        `"${req.deviceModel || ""}"`,
        `"${req.issueDescription || ""}"`,
        `"${req.repairFile || ""}"`,
        `"${req.otherServiceDescription || ""}"`
      ];

      csvRows.push(row.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "service_requests.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    doc.setFontSize(14);
    doc.text("Service Requests Report", 10, y);
    y += 10;

    sorted.forEach((req, idx) => {
      doc.setFontSize(10);
      doc.text(`Request #${idx + 1}`, 10, y);
      y += 6;

      Object.entries(req).forEach(([key, value]) => {
        if (!value) return;
        const text = `${key}: ${Array.isArray(value) ? value.join(", ") : value}`;
        doc.text(text, 10, y);
        y += 5;
        if (y > 280) {
          doc.addPage();
          y = 10;
        }
      });

      y += 8;
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save("service_requests.pdf");
  };

  const renderRequest = (req, index) => (
    <div key={index} className="p-4 border rounded mb-4 shadow bg-white">
      <div className="flex justify-between">
        <p className="text-sm text-gray-500">Submitted: {new Date(req.date).toLocaleString()}</p>
        <button onClick={() => deleteRequest(index)} className="text-red-600 hover:underline">
          Delete
        </button>
      </div>

      <p><strong>Name:</strong> {req.name}</p>
      <p><strong>Email:</strong> {req.email}</p>
      <p><strong>Service:</strong> {req.serviceType}</p>

      <div className="mt-3 pl-3 border-l">
        {Object.entries(req).map(([key, value]) => {
          if (["name", "email", "date", "serviceType"].includes(key)) return null;
          if (!value) return null;
          return (
            <p key={key}><strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value}</p>
          );
        })}
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-8 mt-20 border rounded shadow bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">Dashboard Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Enter password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
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

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Service Requests Dashboard</h2>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          placeholder="Search by name, email, service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border px-3 py-2 rounded">
          <option value="all">All Services</option>
          <option value="business">Business Plan/Profile</option>
          <option value="graphicDesign">Graphic Design</option>
          <option value="ictTraining">ICT Training</option>
          <option value="computerRepair">Computer Repair</option>
          <option value="other">Other Services</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border px-3 py-2 rounded">
          <option value="dateDesc">Newest First</option>
          <option value="dateAsc">Oldest First</option>
          <option value="nameAsc">Name A–Z</option>
          <option value="nameDesc">Name Z–A</option>
          <option value="serviceAsc">Service A–Z</option>
          <option value="serviceDesc">Service Z–A</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <button onClick={downloadCSV} className="bg-blue-600 text-white px-4 py-2 rounded">
          Export CSV
        </button>
        <button onClick={exportPDF} className="bg-gray-700 text-white px-4 py-2 rounded">
          Export PDF
        </button>
        <button onClick={clearAll} className="bg-red-600 text-white px-4 py-2 rounded">
          Clear All
        </button>
      </div>

      {/* List */}
      {paginated.length === 0 ? (
        <p className="text-center text-gray-500">No requests found.</p>
      ) : (
        paginated.map((req, idx) => renderRequest(req, idx))
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

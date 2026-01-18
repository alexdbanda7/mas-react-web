import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

import AddService from "../forms/AddService";
import AdminServices from "./AdminServices";

import AddProject from "../forms/AddProject";
import AdminProjects from "./AdminProjects";

import AddTestimonial from "../forms/AddTestimonial";
import AdminTestimonials from "./AdminTestimonials";

import AddGallery from "../forms/AddGallery";
import AdminGallery from "./AdminGallery";

import {
  Menu,
  X,
  PlusCircle,
  Trash2,
  Image,
  MessageSquare,
  LogOut,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("add-service");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  const NavButton = ({ tab, icon: Icon, label }) => (
    <button
      onClick={() => {
        setActiveTab(tab);
        // ❌ sidebar no longer auto-closes
      }}
      className={`flex items-center gap-3 w-full px-3 py-2 rounded transition ${
        activeTab === tab
          ? "bg-blue-600 text-white"
          : "hover:bg-gray-700 text-gray-200"
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex relative">
      {/* ================= OVERLAY (MOBILE ONLY) ================= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed z-50 bg-gray-900 text-white
        transition-transform duration-300
        w-64 h-screen flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 p-4">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-300 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 px-4 flex-1 overflow-y-auto">
          <NavButton tab="add-service" icon={PlusCircle} label="Add Service" />
          <NavButton
            tab="manage-services"
            icon={Trash2}
            label="Manage Services"
          />

          <NavButton tab="add-gallery" icon={PlusCircle} label="Add Gallery" />
          <NavButton
            tab="manage-gallery"
            icon={Trash2}
            label="Manage Gallery"
          />

          <NavButton tab="add-project" icon={Image} label="Add Project" />
          <NavButton
            tab="manage-projects"
            icon={Trash2}
            label="Manage Projects"
          />

          <NavButton
            tab="add-testimonial"
            icon={MessageSquare}
            label="Add Testimonial"
          />
          <NavButton
            tab="manage-testimonials"
            icon={Trash2}
            label="Manage Testimonials"
          />
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded bg-red-600 hover:bg-red-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main
        className={`flex-1 p-4 md:p-6 w-full transition-all duration-300
        ${sidebarOpen ? "md:ml-64" : "md:ml-0"}`}
      >
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-gray-900 text-white p-2 rounded"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        </div>

        <div className="max-w-4xl mx-auto">
          {activeTab === "add-service" && <AddService />}
          {activeTab === "manage-services" && <AdminServices />}

          {activeTab === "add-gallery" && <AddGallery />}
          {activeTab === "manage-gallery" && <AdminGallery />}

          {activeTab === "add-project" && <AddProject />}
          {activeTab === "manage-projects" && <AdminProjects />}

          {activeTab === "add-testimonial" && <AddTestimonial />}
          {activeTab === "manage-testimonials" && <AdminTestimonials />}
        </div>
      </main>
    </div>
  );
}

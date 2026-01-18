import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

/* Pages */
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Dashboard from "./pages/forms/Dashboard";
import ServiceDetails from "./pages/ServiceDetails";
import BusinessPlanForm from "./pages/forms/BusinessPlanForm";
import Contact from "./pages/Contact";
import Gallery from "./components/Gallery";
import GalleryItem from "./pages/GalleryItem";

/* Layout */
import Layout from "./layout/Layout";

/* Admin */
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./auth/AdminRoute";

/* Google Analytics Tracker */
const GA_MEASUREMENT_ID = "G-GMZPCNY2MP";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

export default function App() {
  return (
    <Router>
      {/* Google Analytics Page Tracking */}
      <AnalyticsTracker />

      <Routes>
        {/* PUBLIC SITE */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:id" element={<GalleryItem />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/services/:serviceId" element={<ServiceDetails />} />
          <Route path="/services/business-plan" element={<BusinessPlanForm />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

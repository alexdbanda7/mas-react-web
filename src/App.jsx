import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Dashboard from "./pages/forms/Dashboard";
import ServiceDetails from "./pages/ServiceDetails";
import BusinessPlanForm from "./pages/forms/BusinessPlanForm";
import Contact from "./pages/Contact";
import Layout from "./layout/Layout";
import Gallery from "./components/Gallery";
import GalleryItem from "./pages/GalleryItem";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Layout wrapper */}
        <Route element={<Layout />}>

          {/* All pages under this layout */}
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

      </Routes>
    </Router>
  );
}
